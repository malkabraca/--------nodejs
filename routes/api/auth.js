const express = require("express");
const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../../validation/authValidationService");
const normalizeUser = require("../../model/usersService/helpers/normalizationUserService");
const usersServiceModel = require("../../model/usersService/usersService");
const { generateToken } = require("../../utils/token/tokenService");
const CustomError = require("../../utils/CustomError");
const authmw = require("../../middleware/authMiddleware");
const permissionsMiddlewareUser = require("../../middleware/permissionsMiddlewareUser")
//register
//http://localhost:8181/api/auth/users
router.post("/users", async (req, res) => {
  try {
    /*
     * joi
     * email unique - mongoose -> mongo
     * encrypt the password
     * normalize
     * create user
     * response user created
     */
    await registerUserValidation(req.body);
    req.body.password = await hashService.generateHash(req.body.password);
    req.body = normalizeUser(req.body);
    await usersServiceModel.registerUser(req.body);
    res.json({ msg: "register" });
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/auth/users/login
router.post("/users/login", async (req, res) => {
  try {
    /**
     * *joi
     * *get user from database
     * *check password
     * *create token
     * *send to user
     */
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
      /*
     ! joi
     */
      // await registerUserValidation(req.body);
      const userData = await usersServiceModel.getUserdById(req.params.id);
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
//TEdit user
//http://localhost:8181/api/auth/users/:id
router.put(
  "/users/:id",
  authmw,
  permissionsMiddlewareUser(false, false, true),
  async (req, res) => {
    try {

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
//delete
//http://localhost:8181/api/auth/users/:id
router.delete(
  "/users/:id",
  authmw,
  permissionsMiddlewareUser(false, true, true),
  async (req, res) => {
    try {

      // await registerUserValidation(req.body);
      // req.body.password = await hashService.generateHash(req.body.password);
      // req.body = normalizeUser(req.body);
      await usersServiceModel.deleteUser(req.body);
      res.json({ msg: "delete" });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
