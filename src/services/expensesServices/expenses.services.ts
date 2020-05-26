import { injectable, inject } from "inversify";
import { IExpenseServiceInterface } from "./expense.service.signature";
import { SequelizeInstanceFactory } from "../../database/orms/sequelize/index";
import { IExpense } from "../interfaces/schemasinterfaces";
import { databaseType } from "../../database/databaseTypes";

@injectable()
export class ExpenseService implements IExpenseServiceInterface {
  database: SequelizeInstanceFactory;
  expenseModel: any;

  constructor(@inject(databaseType) database: SequelizeInstanceFactory) {
    this.database = database;
    this.expenseModel = this.database.models.Expense;
  }

  async find(where: object = {}): Promise<IExpense> {
    try {
      const result: any = await this.expenseModel.findAll({ where });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(expense: IExpense, where: object): Promise<number[]> {
    try {
      const result: number[] = await this.expenseModel.update(expense, {
        where,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(expense: IExpense): Promise<IExpense> {
    try {
      const result: any = await this.expenseModel.create(expense);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
