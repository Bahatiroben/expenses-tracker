import {injectable, inject} from 'inversify';
import { SettingServiceSignature } from './settings.service.signature';
import { sequelizeInstance } from '../../index';
import {SequelizeInstanceFactory} from '../../database/index';
import { ISetting } from '../interfaces/schemasinterfaces'
import {GLOBALTYPES} from '../../globalTypes/index';

@injectable()
export class SettingService extends SettingServiceSignature {
    database: SequelizeInstanceFactory;
    settingModel: any

   constructor(@inject(GLOBALTYPES.database) database: SequelizeInstanceFactory) {
        super()
        this.database = database
        this.settingModel = this.database.models.setting
   }

   async find(where: object = {}): Promise<ISetting[]> {
       try {
           const result: ISetting[] = await this.settingModel.findAll({where});
           return result;
       } catch(error) {
           throw error;
       }
   }

   async update(setting: ISetting, where: any): Promise<number[]> {
       try {
           const result: number[] = await this.settingModel.update(setting, {where});
           return result;
       } catch(error) {
           throw error
       }
   }

   async create(setting: ISetting): Promise<ISetting> {
       try {
           const result: ISetting = await this.settingModel.create(setting);
           return result
       } catch(error){
           throw error;
       }
   }

}