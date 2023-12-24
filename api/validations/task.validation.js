const Joi = require("joi");
const { roles } = require("../../config/vars");

module.exports = {
    task: {
        body: Joi.object({
            title: Joi.string().min(1).max(100).required(),
            description: Joi.string().min(1).max(300).required(),
            date: Joi.string().required(),
            priority: Joi.string().valid("low", "moderate", "high").required(),
            index: Joi.number().integer(),
            email: Joi.string()
                .email({ tlds: { allow: false } })
                .required(),
            uid: Joi.string().min(5).required(),
        }),
    },
    update: {
        body: Joi.object({
            title: Joi.string().min(1).max(100),
            description: Joi.string().min(1).max(300),
            date: Joi.string(),
            priority: Joi.string().valid("low", "moderate", "high"),
            index: Joi.number().integer(),
        }),
    },
};
