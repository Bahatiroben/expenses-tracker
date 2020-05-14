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

const DServiceContainer = new Container();

DServiceContainer.bind<UserServiceSignature>(SERVICESTYPES.userService).to(UserService);
DServiceContainer.bind<SettingServiceSignature>(SERVICESTYPES.settingService).to(SettingService);
DServiceContainer.bind<ExpenseServiceSignature>(SERVICESTYPES.expenseService).to(ExpenseService);

export default DServiceContainer