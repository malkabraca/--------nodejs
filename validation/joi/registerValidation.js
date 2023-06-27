const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.object()
    .keys({
      firstName: Joi.string().min(2).max(256).required(),
      middleName: Joi.string().min(2).max(256).allow(""),
      lastName: Joi.string().min(2).max(256).required(),
    })
    .required(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)).messages({
      "string.pattern.base":
        "The phone number must start with 0 and contain only numbers. You can put - after the third digit",
    }).required(),
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .required()
    .messages({
      "string.pattern.base":
        "The email structure is incorrect, the email must contain English letters and @ for example A@gmail.com",
    }),
  password: Joi.string()
    .regex(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "the password should be supper protected, this mean that its should contain only upper and lower case latter's",
    }),
  image: Joi.object().keys({
    url: Joi.string().regex(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
    ).messages({
      "string.pattern.base":
        "The address must start with http// and contain letters and numbers",
    }),
    alt: Joi.string().min(2).max(256).required(),
  }),
  address: Joi.object()
    .keys({
      state: Joi.string().min(2).max(256).allow(""),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.number().min(1).required(),
      zip: Joi.number().allow("", 0),
    })
    .required(),
  isAdmin: Joi.boolean().allow(""),
  isBusiness: Joi.boolean().required(),
});

const validateRegisterSchema = (userInput) =>
  registerSchema.validateAsync(userInput);

module.exports = {
  validateRegisterSchema,
};
