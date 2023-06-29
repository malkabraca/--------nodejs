const config = require("config");
const joiCardsValidation = require("./joi/cardsValidation");
const joiBizNumberCardsValidation = require("./joi/bizNumberValidetion")

const validatorOption = config.get("validatorOption");

const createCardValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiCardsValidation.validateCardSchema(userInput);
  }
  throw new Error("validator undefined");
};

const bizNumberCardValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiBizNumberCardsValidation.validateBizCardSchema(userInput);
  }
  throw new Error("validator undefined");
};
module.exports = {
  createCardValidation,
  bizNumberCardValidation
};
