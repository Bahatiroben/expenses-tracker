import * as Joi from 'joi';
import { generalSchema } from './generalSchema';

export const expenseCreateSchema: Joi.Schema = Joi.object().keys({
    title: generalSchema.string.required(),
    description:generalSchema.longString.required(),
    date: generalSchema.date.required(),
    tags: generalSchema.string.optional(),
});

export const expenseOptionalBodySchema: Joi.Schema = Joi.object().keys({
    title: generalSchema.string.optional(),
    description:generalSchema.longString.optional(),
    date: generalSchema.date.optional(),
    tags: generalSchema.string.optional(),
    id: Joi.number().required()
});

export const getById: Joi.Schema= Joi.object().keys({
    id: Joi.number().integer().required()
})


export const periodicExpenseCreateSchema: Joi.Schema = Joi.object().keys({
    title: generalSchema.string.required(),
    description:generalSchema.longString.required(),
    date: generalSchema.date.required(),
    tags: generalSchema.string.optional(),
    repeat: getById,
    nextExec: generalSchema.date.greater(Joi.ref('date'))
});

export const periodicExpenseOptionalBodySchema: Joi.Schema = Joi.object().keys({
    title: generalSchema.string.optional(),
    description:generalSchema.longString.optional(),
    date: generalSchema.date.optional(),
    tags: generalSchema.string.optional(),
    id: Joi.number().required(),
    repeat: getById.optional(),
    nextExec: generalSchema.date.greater(Joi.ref('date')).optional()
});
