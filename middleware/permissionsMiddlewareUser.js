const CustomError = require("../utils/CustomError");
const { getUserdById } = require("../model/usersService/usersService");


const checkIfOwner = async (iduser, res, next) => {
  try {
    //! joi the idcard
    const UserData = await getUserdById(iduser);
    console.log(UserData);
    next();
    // if (!UserData) {
    //   return res.status(400).json({ msg: "user not found" });
    // }
    // if (UserData.user_id == iduser) {
    //   next();
    // } else {
    //   res.status(401).json({ msg: "you not the biz owner" });
    // }ד
  } catch (err) {
    res.status(400).json(err);
  }
};

/*
  isBiz = every biz
  isAdmin = is admin
  isBizOwner = biz owner
*/

const permissionsMiddlewareUser = (isBiz, isAdmin, isOwner) => {
  return (req, res, next) => {
    if (!req.userData) {
      throw new CustomError("must provide userData");
    }
    if (isBiz === req.userData.isBusiness && isBiz === true) {
      return next();
    }
    if (isAdmin === req.userData.isAdmin && isAdmin === true) {
      return next();
    }
    if (isOwner === true) {
      return checkIfOwner( req.params.id, res, next);
    }
    
    res.status(401).json({ msg: "you not allowed to edit this user" });
  };
};

module.exports = permissionsMiddlewareUser;
