import { IUser } from '../interfaces/schemasinterfaces'

export abstract class UserServiceSignature {

    abstract find(where?: any): Promise<IUser | IUser[]>

    abstract create(user: IUser): Promise<IUser>

    abstract update(user: IUser, where: any): Promise<number[]>
}