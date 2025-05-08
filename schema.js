const Joi = require("joi");

module.exports.messageSchema = Joi.object({
  msg: Joi.string().required(),
});
