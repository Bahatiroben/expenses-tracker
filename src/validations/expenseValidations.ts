import {Request, Response, NextFunction} from 'express'
import { IExpense } from 'services/interfaces/schemasinterfaces'
import validate from '../utils/validator';
import { expenseCreateSchema, expenseOptionalBodySchema, getById } from './schemas/expenseSchema';

export class ExpenseValidations {
    static create(req: Request, res: Response, next: NextFunction) {
        const expense: IExpense = req.body;
        validate(expense, expenseCreateSchema, res, next);
    }

    static update(req: Request, res: Response, next: NextFunction) {
        const expenseUpdates: IExpense = req.body;
        validate({ ...expenseUpdates, id: req.params.id}, expenseOptionalBodySchema, res, next);
    }

    static delete(req: Request, res: Response, next: NextFunction) {
        validate({id: req.params.id}, getById, res, next)  
    }

    static getOne(req: Request, res: Response, next: NextFunction) {
        validate({id: req.params.id}, getById, res, next)  
    }
}