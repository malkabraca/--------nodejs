const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .messages({
      "string.pattern.base":
        "The email structure is incorrect, the email must contain English letters and @ for example A@gmail.com",
    })
    .required(),
  password: Joi.string()
    .regex(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
    )
    .messages({
      "string.pattern.base":
        "the password should be supper protected, this mean that its should contain only upper and lower case latter's",
    })
    .required(),
});

const validateLoginSchema = (userInput) => loginSchema.validateAsync(userInput);

module.exports = {
  validateLoginSchema,
};
