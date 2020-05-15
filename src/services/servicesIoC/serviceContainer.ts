import { Container } from "inversify";
import { SERVICESTYPES } from "../types";
import {
  UserService,
  IUserServiceInterfacee,
  SettingService,
  ISettingServiceInterface,
  ExpenseService,
  IExpenseServiceInterface,
} from "../index";

const DServiceContainer = new Container();

DServiceContainer.bind<IUserServiceInterfacee>(SERVICESTYPES.userService).to(
  UserService
);
DServiceContainer.bind<ISettingServiceInterface>(
  SERVICESTYPES.settingService
).to(SettingService);
DServiceContainer.bind<IExpenseServiceInterface>(
  SERVICESTYPES.expenseService
).to(ExpenseService);

export default DServiceContainer;
