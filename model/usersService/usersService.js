const config = require("config");
const usersServiceMongo = require("../mongodb/users/usersService");
const dbOption = config.get("dbOption");

const registerUser = (userData) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.registerUser(userData);
  }
};

const getUserByEmail = (email) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getUserByEmail(email);
  }
};

const getAllUsers = () => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getAllUsers();
  }
};

const getUserdById = (id) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getUserdById(id);
  }
};
const deleteUser = (id) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.deleteUser(id);
  }
};
module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
  getUserdById,
  deleteUser
};
