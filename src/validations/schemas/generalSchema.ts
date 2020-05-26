import * as Joi from 'joi';

export const generalSchema = {
    userName: Joi
                .string()
                .trim()
                .min(3),
    password: Joi
                .string()
                .min(8)
                .required(),
    email: Joi.string().email().required()
}