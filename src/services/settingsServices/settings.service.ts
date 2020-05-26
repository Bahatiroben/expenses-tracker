import { injectable, inject } from "inversify";
import { ISettingServiceInterface } from "./settings.service.signature";
import { sequelizeInstance } from "../../index";
import { SequelizeInstanceFactory } from "../../database/orms/sequelize/index";
import { ISetting } from "../interfaces/schemasinterfaces";
import { databaseType } from "../../database/databaseTypes";

@injectable()
export class SettingService implements ISettingServiceInterface {
  database: SequelizeInstanceFactory;
  settingModel: any;

  constructor(@inject(databaseType) database: SequelizeInstanceFactory) {
    this.database = database;
    this.settingModel = this.database.models.setting;
  }

  async find(where: object = {}): Promise<ISetting[]> {
    try {
      const result: ISetting[] = await this.settingModel.findAll({ where });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(setting: ISetting, where: any): Promise<number[]> {
    try {
      const result: number[] = await this.settingModel.update(setting, {
        where,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(setting: ISetting): Promise<ISetting> {
    try {
      const result: ISetting = await this.settingModel.create(setting);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
