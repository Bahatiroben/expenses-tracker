import { injectable, inject } from "inversify";
import { IJobInterface } from "./job.service.signature";
import { sequelizeInstance } from "../../index";
import { SequelizeInstanceFactory } from "../../database/orms/sequelize/index";
import { IJob } from "../interfaces/schemasinterfaces";
import { databaseType } from "../../database/databaseTypes";

@injectable()
export class JobService implements IJobInterface {
  database: SequelizeInstanceFactory;
  jobModel: any;

  constructor(@inject(databaseType) database: SequelizeInstanceFactory) {
    this.database = database;
    this.jobModel = this.database.models.Job;
  }

  async find(where: object = {}): Promise<IJob[]> {
    try {
      const result: any = await this.jobModel.findAll({ where });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(job: IJob, where: any): Promise<number[]> {
    try {
      const result: number[] = await this.jobModel.update(job, { where });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(job: IJob): Promise<IJob> {
    try {
      const result: any = await this.jobModel.create(job);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(where: any): Promise<number> {
    try {
      const result: any = await this.jobModel.destroy({where});
      return result;
    } catch (error) {
      throw error;
    } 
  }
}
