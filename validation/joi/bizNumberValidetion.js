const Joi = require("joi");

const bizCardSchema = Joi.number().min(1000000).max(9999999).allow("");

const validateBizCardSchema = (userInput) => {
  return bizCardSchema.validateAsync(userInput);
};



module.exports = {
    validateBizCardSchema,
  };
