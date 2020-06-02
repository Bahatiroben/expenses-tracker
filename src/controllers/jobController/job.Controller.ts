import { SettingService, IJobInterface } from "../../services/index";
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
import { IJob } from "services/interfaces/schemasinterfaces";
import { IResponse } from "../../helpers/responseHelper/reponseInterface";
import { responseType } from "../../helpers/responseHelper/responseTypes";
import { IAuthHelper, authType } from "../../helpers/authHelper/index";
import { ExpenseValidations } from '../../validations/expenseValidations'
import { JobValidations } from '../../validations/periodicExpenseValidations';


@controller("/expenses/periodic")
export class JobsController {
  @inject(SERVICESTYPES.jobService)
  protected jobService: IJobInterface;

  @inject(responseType)
  protected CustomResponse: IResponse;

  @inject(authType)
  private AuthencticationHelper: IAuthHelper;
  

  @httpPost("/add", JobValidations.create)
  async add(req: Request, res: Response) {
    try {
      const { id: userId } = await this.AuthencticationHelper.decrypt(req, res);
      if(!userId) {
        return
      }
      const job: IJob = req.body;
      const result = <IJob[]>(
        await this.jobService.find({title: job.title, description: job.description, userId })
      );

      if (result.length !== 0) {
        return this.CustomResponse.conflict(res, "job is already present");
      }

      const createdExpense: IJob = await this.jobService.create({...job, userId});
      return this.CustomResponse.success(res, createdExpense, "job added successfully", 201);
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
      const results = await this.jobService.find({userId});
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
      const jobId = req.params.id;
      const result = <any[]> await this.jobService.find({ id: jobId, userId });

      if (result.length === 0) {
        return this.CustomResponse.notFound(res, "Expense not found");
      }

      return this.CustomResponse.success(
        res,
        result[0],
        "job updated in successfully"
      );
    } catch (error) {
      throw error;
    }
  }

  @httpPatch('/update/:id', JobValidations.update)
  async update(req: Request, res: Response) {
    try {
      const { id: userId } = await this.AuthencticationHelper.decrypt(req, res);
      if(!userId) {
        return
      }
      const jobUpdate =<IJob> req.body;
      const { id: jobId } = req.params;

      const result = <any[]> await this.jobService.find({ id: jobId, userId })

      if (result.length === 0) {
        return this.CustomResponse.notFound(res, "Expense not found");
      }

      // update the record
      await this.jobService.update(jobUpdate, {id: jobId})
      return this.CustomResponse.success(
        res,
        { message: 'success' },
        "job updated in successfully"
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
      const { id: jobId } = req.params;

      const result = <any[]> await this.jobService.find({ id: jobId, userId })

      if (result.length === 0) {
        return this.CustomResponse.notFound(res, "Expense not found");
      }

      // delete the record
      const deletedRecords: number = await this.jobService.delete({id: jobId})
      return this.CustomResponse.success(
        res,
        {deletedRecords},
        "job updated in successfully"
      );
    } catch (error) {
      throw error;
    }
  }
}
