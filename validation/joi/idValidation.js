const Joi = require("joi");

const idSchema = Joi.string().hex().required();

const validateIdSchema = (userInput) => {
  return idSchema.validateAsync(userInput);
};

module.exports = {
    validateIdSchema,
};
