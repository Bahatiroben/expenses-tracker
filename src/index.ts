import {Sequelize} from 'sequelize-typescript';
import {SequelizeInstanceFactory} from './database/index';
import * as models from './database/orms/sequelize/models/index';
import {UserService} from './services/userServices/user.services';
import { IUser } from 'services/interfaces/schemasinterfaces';
import { ContainerFactory } from './globalIoC/index';
import { GLOBALTYPES } from './globalTypes/index'

const Container = ContainerFactory.config();
export const sequelizeInstance: SequelizeInstanceFactory = Container.get(GLOBALTYPES.database)
sequelizeInstance.migrate()

const userService = new UserService(sequelizeInstance);

const sampleUSer: IUser = {
    firstName: 'UPDATED',
    lastName: 'Robben',
    email: 'bahati.robben@lux.com',
    password: 'Root1123#'
}

const show = async () => {
    const t: IUser = await userService.find({firstName: 'UPDATED'});;
    console.log(t)
}

// show()
