import { Request, Response, NextFunction } from 'express';
import {IAuthHelper} from './authHelperInterface';
import { IUser } from 'services/interfaces/schemasinterfaces';
import {sign, verify} from 'jsonwebtoken';
import * as Config from '../../configVars';
import {inject, injectable} from 'inversify';
import { UserServiceSignature} from '../../services/index';
import { SERVICESTYPES } from '../../services/types';
import {IResponse, responseType} from '../responseHelper/index';
import { AutoIncrement } from 'sequelize-typescript';

export class Authentication implements IAuthHelper{

    @inject(SERVICESTYPES.userService)
    protected UserService: UserServiceSignature

    @inject(responseType)
    protected CustomResponse: IResponse

    encrypt(payload: IUser): string {
        const token: string = sign(payload, Config.JWT_SECRET);
        return token
    };

    async decrypt(req: Request | any, res: Response, next: NextFunction) {

        try {
        const authorization: string = req.headers.authorization;
        
        if(!authorization) {
            return this.CustomResponse.unAuthorized(res);
        }

        const token = authorization.split(' ')[1];

        if(!token) {
            return this.CustomResponse.unAuthorized(res, 'token not found');
        }

        // verify
        const payload =<IUser> verify(token, Config.JWT_SECRET);
        const User=<IUser[]> await this.UserService.find(payload);
        const {email} = User[0];
        if(!email) {
            // if no user found
            return this.CustomResponse.unAuthorized(res);
        }
        req.user = payload;
        next() 
        
    } catch(error) {
        throw error
    }
    }
}