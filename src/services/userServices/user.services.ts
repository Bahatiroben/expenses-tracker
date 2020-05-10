import {injectable, inject} from 'inversify';
import { UserServiceSignature } from './user.service.signature';
import { sequelizeInstance } from '../../index';
import {SequelizeInstanceFactory} from '../../database/index';
import { IUser } from '../interfaces/schemasinterfaces'
import {GLOBALTYPES} from '../../globalTypes/index';

@injectable()
export class UserService extends UserServiceSignature {
    database: SequelizeInstanceFactory;
    userModel: any

   constructor(@inject(GLOBALTYPES.database) database: SequelizeInstanceFactory) {
        super()
        this.database = database
        this.userModel = this.database.models.User
   }

   async find(where: object = {}): Promise<IUser> {
       try {
           const result: any = await this.userModel.findAll({where});
           return result;
       } catch(error) {
           throw error;
       }
   }

   async update(user: IUser, where: any): Promise<number[]> {
       try {
           const result: number[] = await this.userModel.update(user, {where});
           return result;
       } catch(error) {
           throw error
       }
   }

   async create(user: IUser): Promise<IUser> {
       try {
           const result: any = await this.userModel.create(user);
           return result
       } catch(error){
           throw error;
       }
   }

}