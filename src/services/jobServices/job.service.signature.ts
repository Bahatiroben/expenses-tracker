import { IJob } from "../interfaces/schemasinterfaces";

export interface IJobInterface {

  find(where?: any): Promise<IJob[]>;

  create(user: IJob): Promise<IJob>;

  update(user: IJob, where: any): Promise<number[]>;

  delete(where: any): Promise<number>
}
