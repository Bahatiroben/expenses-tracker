import {UserService, UserServiceSignature} from '../../services/index';
import {SERVICESTYPES} from '../../services/types';
import {httpGet, httpPost, httpPatch, controller} from 'inversify-express-utils';
import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction} from 'express'
import { IUser, ILoginUser } from 'services/interfaces/schemasinterfaces';

@controller('/user')
export class UserController {

    @inject(SERVICESTYPES.userService)
    protected userService: UserServiceSignature

    async signup(req: Request, res: Response): Promise<IUser[] | IUser> {
        try {
            const userCredentials: IUser = req.body
            const result = await this.userService.find();
            res.status()
        } catch(error) {
            throw error;
        }
    }
}