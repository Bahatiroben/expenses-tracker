import {Container} from 'inversify';

import CDatabaseContainer from '../database/databaseIoC';
import  CHelpersContainer from '../helpers/helpersContainer';
import CServiceContainer from '../services/servicesIoC/serviceContainer';

export const allContainers: Container[] = [
    CDatabaseContainer,
    CServiceContainer,
    CHelpersContainer,
]