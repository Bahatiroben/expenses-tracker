import { Container } from 'inversify';
import {SERVICESTYPES } from '../types';
import {
    UserService,
    UserServiceSignature,
    SettingService,
    SettingServiceSignature,
    ExpenseService,
    ExpenseServiceSignature
} from '../index';

const servicesContainer = new Container();

servicesContainer.bind<UserServiceSignature>(SERVICESTYPES.userService).to(UserService);
servicesContainer.bind<SettingServiceSignature>(SERVICESTYPES.settingService).to(SettingService);
servicesContainer.bind<ExpenseServiceSignature>(SERVICESTYPES.expenseService).to(ExpenseService);

export default servicesContainer