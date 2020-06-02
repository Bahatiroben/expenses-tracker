import {Request, Response, NextFunction} from 'express'
import { IJob } from 'services/interfaces/schemasinterfaces'
import validate from '../utils/validator';
import { periodicExpenseCreateSchema, periodicExpenseOptionalBodySchema } from './schemas/expenseSchema';

export class JobValidations {
    static create(req: Request, res: Response, next: NextFunction) {
        const expense: IJob = req.body;
        validate(expense, periodicExpenseCreateSchema, res, next);
    }

    static update(req: Request, res: Response, next: NextFunction) {
        const expenseUpdates: IJob = req.body;
        validate({ ...expenseUpdates, id: req.params.id}, periodicExpenseOptionalBodySchema, res, next);
    }
}