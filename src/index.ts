import {SequelizeInstanceFactory} from './database/orms/sequelize/index';
import * as models from './database/orms/sequelize/models/index';
import {UserService} from './services/userServices/user.services';
import { IUser } from 'services/interfaces/schemasinterfaces';
import { ContainerFactory } from './globalIoC/index';
import { databaseType } from './database/databaseTypes'

export const Container = ContainerFactory.config();
export const sequelizeInstance: SequelizeInstanceFactory = Container.get(databaseType)
sequelizeInstance.migrate()

const userService = new UserService(sequelizeInstance);

const sampleUSer: IUser = {
    firstName: 'Uwimana',
    lastName: 'Ratifa',
    email: 'email3@lux.com',
    password: 'Root1123#'
}

const show = async () => {
    const t = <IUser> await userService.find({    firstName: 'Uwimana',
    lastName: 'Ratifa',
    email: 'email3@lux.com'});;
    console.log(t)
}

show()
