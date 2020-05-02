import {Container, interfaces} from 'inversify';
import servicesContainer from '../services/servicesIoC/serviceContainer';
import { GLOBALTYPES } from '../globalTypes/index';
import {SequelizeInstanceFactory} from '../database/index';
import * as models from '../database/orms/sequelize/models/index';

export class ContainerFactory {
    static config(): interfaces.Container {
        const sequelizeInstance: SequelizeInstanceFactory = new SequelizeInstanceFactory({
            dialect: 'postgres',
            models: Object.values(models), logging: false
        });

        const container = new Container()
        container.bind<SequelizeInstanceFactory>(GLOBALTYPES.database).toConstantValue(sequelizeInstance)
       const container1: interfaces.Container = Container.merge(container, servicesContainer);
       return container1
    }
}
