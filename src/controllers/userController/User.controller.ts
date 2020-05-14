import { UserService, UserServiceSignature } from "../../services/index";
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
import {IResponse} from '../../helpers/responseHelper/reponseInterface';
import {responseType} from '../../helpers/responseHelper/responseTypes';

@controller("/user")
export class UserController {
  @inject(SERVICESTYPES.userService)
  protected userService: UserServiceSignature;

  @inject(responseType)
  protected CustomResponse: IResponse

  async signup(req: Request, res: Response): Promise<Response> {

    try {

      const userCredentials: IUser = req.body;
      const result = <IUser[]> await this.userService.find({email: userCredentials.email});

      if (result.length !== 0) {
        return this.CustomResponse.conflict(res, 'email already registered');
      }

      // hash password
      
      // create token

      return this.CustomResponse.success(res, result, 'user created successfully');
    } catch (error) {

      throw error;

    }
  }
}
