import { IExpense } from "../interfaces/schemasinterfaces";

export interface IExpenseServiceInterface {
  find(where: object): Promise<IExpense | IExpense[]>;

  update(expense: IExpense, where: object): Promise<number[]>;

  create(expense: IExpense): Promise<IExpense>;

  delete(where: object): Promise<number>;
}
