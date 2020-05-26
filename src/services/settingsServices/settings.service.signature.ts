import { ISetting } from "../interfaces/schemasinterfaces";

export interface ISettingServiceInterface {
  find(where?: any): Promise<ISetting | ISetting[]>;

  create(user: ISetting): Promise<ISetting>;

  update(user: ISetting, where: object): Promise<number[]>;
}
