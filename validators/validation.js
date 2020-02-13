//VALIDATION 
const Joi = require('@hapi/joi');

//Signup Validation
const signUpValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()

  });
  return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()

  });
  return schema.validate(data);
};

module.exports.signUpValidation = signUpValidation;
module.exports.loginValidation = loginValidation;