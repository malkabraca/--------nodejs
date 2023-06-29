const CustomError = require("../utils/CustomError");
const jwt = require("jsonwebtoken");


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

    if (!(req.params.id === req.userData._id)) {
      res.status(401).json({ msg: "you are not the owner" });
    }
    if (req.params.id === req.userData._id && isOwner === true) {
      return next();
    }
    res
      .status(401)
      .json({ msg: "you not allowed to edit this user usermiddleware" });
  };
};

module.exports = permissionsMiddlewareUser;

