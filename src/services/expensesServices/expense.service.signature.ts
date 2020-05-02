import { IExpense } from '../interfaces/schemasinterfaces';

export abstract class ExpenseServiceSignature {

    abstract find(where: object): Promise<IExpense | IExpense[]>

    abstract update(expense: IExpense, where: object): Promise<number[]>

    abstract create(expense: IExpense): Promise<IExpense>

}