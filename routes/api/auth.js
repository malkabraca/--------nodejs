const express = require("express");

const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const {
  registerUserValidation,
  loginUserValidation,
  idUserValidation,
} = require("../../validation/authValidationService");
const normalizeUser = require("../../model/usersService/helpers/normalizationUserService");
const usersServiceModel = require("../../model/usersService/usersService");
const { generateToken } = require("../../utils/token/tokenService");
const CustomError = require("../../utils/CustomError");
const authmw = require("../../middleware/authMiddleware");
const permissionsMiddlewareUser = require("../../middleware/permissionsMiddlewareUser");
//register
//http://localhost:8181/api/auth/users
router.post("/users", async (req, res) => {
  try {
    await registerUserValidation(req.body);
    req.body.password = await hashService.generateHash(req.body.password);
    req.body = normalizeUser(req.body);
    await usersServiceModel.registerUser(req.body);
    res.json({ msg: "register" });
  } catch (err) {
    res.status(400).json(err);
  }
});

//localhost:8181/api/auth/users/login
 router.post("/users/login", async (req, res) => {
  try {
    await loginUserValidation(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    if (!userData) throw new CustomError("invalid email and/or password");
    const isPasswordMatch = await hashService.cmpHash(
      req.body.password,
      userData.password
    );
    if (!isPasswordMatch)
      throw new CustomError("invalid email and/or password");
    const token = await generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
      isBusiness: userData.isBusiness,
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
});

// const MAX_LOGIN_ATTEMPTS = 3;
// const loginAttempts = new Map();

// router.post("/users/login", async (req, res) => {
//   try {
//     await validateLoginSchema(req.body);
//     const userData = await usersServiceModel.getUserByEmail(req.body.email);
//     if (!userData) throw new CustomError("invalid email and/or password");

//     const email = req.body.email;
//     const attempts = loginAttempts.get(email) || 0;
//     if (attempts >= MAX_LOGIN_ATTEMPTS) {
//       throw new CustomError(
//         "access blocked for 24 hours due to too many login attempts"
//       );
//     }

//     const isPasswordMatch = await hashService.cmpHash(
//       req.body.password,
//       userData.password
//     );
//     if (!isPasswordMatch) {
//       loginAttempts.set(email, attempts + 1);
//       throw new CustomError("invalid email and/or password");
//     }

//     loginAttempts.delete(email);

//     const token = await generateToken({
//       _id: userData._id,
//       isAdmin: userData.isAdmin,
//       isBusiness: userData.isBusiness,
//     });
//     res.json({ token });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

//get all users,admin
//http://localhost:8181/api/auth/users
router.get(
  "/users",
  authmw,
  permissionsMiddlewareUser(false, true, false),
  async (req, res) => {
    try {
      const userData = await usersServiceModel.getAllUsers();
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//Get user,The registered user or admin
//http://localhost:8181/api/auth/users/:id
router.get(
  "/users/:id",
  authmw,
  permissionsMiddlewareUser(false, true, true),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      const userData = await usersServiceModel.getUserdById(req.params.id);
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// TEdit user
// http://localhost:8181/api/auth/users/:id
router.put(
  "/users/:id",
  authmw,
  permissionsMiddlewareUser(false, false, true),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      await registerUserValidation(req.body);
      req.body.password = await hashService.generateHash(req.body.password);
      req.body = normalizeUser(req.body);
      await usersServiceModel.registerUser(req.body);
      res.json({ msg: "Editing was done successfully" });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// Edit is biz user
// http://localhost:8181/api/auth/users/:id
router.patch(
  "/users/:id",
  authmw,
  permissionsMiddlewareUser(false, false, true),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      const bizUserID = req.params.id;
      let userData = await usersServiceModel.getUserdById(bizUserID);
      if (userData.isBusiness === true) {
        userData.isBusiness = false;
        userData = await userData.save();
        res.json({ msg: "Editing was done false successfully" });
      } else {
        userData.isBusiness = true;
        userData = await userData.save();
        res.json({ msg: "Editing was done true successfully" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//delete
//http://localhost:8181/api/auth/users/:id
router.delete(
  "/users/:id",
  authmw,
  permissionsMiddlewareUser(false, true, true),
  async (req, res) => {
    try {
      //! joi validation
      // await registerUserValidation(req.body);
      // req.body.password = await hashService.generateHash(req.body.password);
      // req.body = normalizeUser(req.body);
      await idUserValidation(req.params.id);
      await usersServiceModel.deleteUser(req.body);
      res.json({ msg: "delete" });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
