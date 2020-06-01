import { SettingService, IExpenseServiceInterface } from "../../services/index";
import { SERVICESTYPES } from "../../services/types";
import {
  httpGet,
  httpPost,
  httpPatch,
  controller,
  requestParam,
  BaseHttpController,
  httpDelete,
} from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { IExpense } from "services/interfaces/schemasinterfaces";
import { IResponse } from "../../helpers/responseHelper/reponseInterface";
import { responseType } from "../../helpers/responseHelper/responseTypes";
// import { IPassword, passwordType } from "../../helpers/passwordHelper/index";
import { IAuthHelper, authType } from "../../helpers/authHelper/index";
import { ExpenseValidations } from '../../validations/expenseValidations'


@controller("/expenses")
export class ExpenseController {
  @inject(SERVICESTYPES.expenseService)
  protected expenseService: IExpenseServiceInterface;

  @inject(responseType)
  protected CustomResponse: IResponse;

  @inject(authType)
  private AuthencticationHelper: IAuthHelper;
  

  @httpPost("/add", ExpenseValidations.create)
  async add(req: Request, res: Response) {
    try {
      const { id: userId } = await this.AuthencticationHelper.decrypt(req, res);
      if(!userId) {
        return
      }
      const expense: IExpense = req.body;
      const result = <IExpense[]>(
        await this.expenseService.find({title: expense.title, description: expense.description, userId })
      );

      if (result.length !== 0) {
        return this.CustomResponse.conflict(res, "expense is already present");
      }

      const createdExpense: IExpense = await this.expenseService.create({...expense, userId});
      return this.CustomResponse.success(res, createdExpense, "expense added successfully", 201);
    } catch (error) {
      throw error;
    }
  }

  @httpGet('/')
  async getAll(req: Request, res: Response) {
    try {
      const { id: userId } = await this.AuthencticationHelper.decrypt(req, res);
      if(!userId) {
        return
      }
      const results = await this.expenseService.find({userId});
      return this.CustomResponse.success(res, results);
    }
    catch (error) {
      throw error
    }
  }

  @httpGet('/:id', ExpenseValidations.getOne )
  async getExpenses(req: Request, res: Response) {
    try {
      const { id: userId } = await this.AuthencticationHelper.decrypt(req, res);
      if(!userId) {
        return
      }
      const expenseId = req.params.id;
      const result = <any[]> await this.expenseService.find({ id: expenseId, userId });

      if (result.length === 0) {
        return this.CustomResponse.notFound(res, "Expense not found");
      }

      // GIVE NO CLUE ABOUT EXPENSE EXISTING IF THE USER IS NOT THE OWNER. BY NOT USING THE FOLLOWING CODE
      // if(result[0].dataValues.userId !== userId ) {
      //   return this.CustomResponse.forbidden(res, "You are not allowed to perform this task")
      // }

      return this.CustomResponse.success(
        res,
        result[0],
        "expense updated in successfully"
      );
    } catch (error) {
      throw error;
    }
  }

  @httpPatch('/update/:id', ExpenseValidations.getOne)
  async update(req: Request, res: Response) {
    try {
      const { id: userId } = await this.AuthencticationHelper.decrypt(req, res);
      if(!userId) {
        return
      }
      const expenseUpdate =<IExpense> req.body;
      const { id: expenseId } = req.params;

      const result = <any[]> await this.expenseService.find({ id: expenseId, userId })

      if (result.length === 0) {
        return this.CustomResponse.notFound(res, "Expense not found");
      }

      // GIVE NO CLUE ABOUT EXPENSE EXISTING IF THE USER IS NOT THE OWNER. BY NOT USING THE FOLLOWING CODE
      // if(result[0].dataValues.userId !== userId ) {
      //   return this.CustomResponse.forbidden(res, "You are not allowed to perform this task")
      // }

      // update the record
      await this.expenseService.update(expenseUpdate, {id: expenseId})
      return this.CustomResponse.success(
        res,
        { message: 'success' },
        "expense updated in successfully"
      );
    } catch (error) {
      throw error;
    }
  }

  @httpDelete('/delete/:id', ExpenseValidations.getOne)
  async delete(req: Request, res: Response) {
    try {
      const { id: userId } = await this.AuthencticationHelper.decrypt(req, res);
      if(!userId) {
        return
      }
      const { id: expenseId } = req.params;

      const result = <any[]> await this.expenseService.find({ id: expenseId, userId })

      if (result.length === 0) {
        return this.CustomResponse.notFound(res, "Expense not found");
      }

      // GIVE NO CLUE ABOUT EXPENSE EXISTING IF THE USER IS NOT THE OWNER. BY NOT USING THE FOLLOWING CODE
      // if(result[0].dataValues.userId !== userId ) {
      //   return this.CustomResponse.forbidden(res, "You are not allowed to perform this task")
      // }

      // delete the record
      const deletedRecords: number = await this.expenseService.delete({id: expenseId})
      return this.CustomResponse.success(
        res,
        {deletedRecords},
        "expense updated in successfully"
      );
    } catch (error) {
      throw error;
    }
  }
}
