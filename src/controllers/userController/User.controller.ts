import { UserService, IUserServiceInterfacee } from "../../services/index";
import { SERVICESTYPES } from "../../services/types";
import {
  httpGet,
  httpPost,
  httpPatch,
  controller,
} from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { IUser, ILoginUser } from "services/interfaces/schemasinterfaces";
import { IResponse } from "../../helpers/responseHelper/reponseInterface";
import { responseType } from "../../helpers/responseHelper/responseTypes";
import { IPassword, passwordType } from "../../helpers/passwordHelper/index";
import { IAuthHelper, authType } from "../../helpers/authHelper/index";

@controller("/user")
export class UserController {
  @inject(SERVICESTYPES.userService)
  protected userService: IUserServiceInterfacee;

  @inject(responseType)
  protected CustomResponse: IResponse;

  @inject(passwordType)
  protected PasswordHelper: IPassword;

  @inject(authType)
  protected AuthencticationHelper: IAuthHelper;

  @httpPost("/signup")
  async signup(req: Request, res: Response): Promise<Response> {
    try {
      const userCredentials: IUser = req.body;
      const result = <IUser[]>(
        await this.userService.find({ email: userCredentials.email })
      );

      if (result.length !== 0) {
        return this.CustomResponse.conflict(res, "email already registered");
      }

      // hash password
      const hashedPassword: string = await this.PasswordHelper.encrypt(
        userCredentials.password
      );
      userCredentials.password = hashedPassword;

      // create token
      const token = this.AuthencticationHelper.encrypt(userCredentials);
      await this.userService.create(userCredentials);
      return this.CustomResponse.success(
        res,
        { token },
        "user created successfully"
      );
    } catch (error) {
      throw error;
    }
  }
}
