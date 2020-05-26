import * as Joi from 'joi';
import { generalSchema } from './generalSchema';

export const userSignupSchema: Joi.Schema = Joi.object().keys({
    firstName: generalSchema.userName.required(),
    lastName:generalSchema.userName.required(),
    email: generalSchema.email,
    password: generalSchema.password,
    phoneNumber: generalSchema.userName.optional(),
});

export const userLoginSchema: Joi.Schema = Joi.object().keys({
    email: generalSchema.email,
    password: generalSchema.password
})