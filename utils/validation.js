const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name must not exceed 100 characters'
        }),
    email: Joi.string()
        .email()
        .max(255)
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required',
            'string.max': 'Email must not exceed 255 characters'
        })
});

const updateUserSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .optional()
        .messages({
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name must not exceed 100 characters'
        }),
    email: Joi.string()
        .email()
        .max(255)
        .optional()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.max': 'Email must not exceed 255 characters'
        })
}).min(1).messages({
    'object.min': 'At least one field (name or email) must be provided for update'
});

const validateUser = (data) => {
    return userSchema.validate(data, { abortEarly: false });
};

const validateUpdateUser = (data) => {
    return updateUserSchema.validate(data, { abortEarly: false });
};

module.exports = {
    validateUser,
    validateUpdateUser
};
