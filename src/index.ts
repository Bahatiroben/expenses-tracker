import {Sequelize} from 'sequelize-typescript';
import {SequelizeInstanceFactory} from './database/index';
import * as models from './database/orms/sequelize/models/index';

const sequelizeInstance: SequelizeInstanceFactory = new SequelizeInstanceFactory({dialect: 'postgres',
models: Object.values(models), logging: console.log});

sequelizeInstance.migrate()