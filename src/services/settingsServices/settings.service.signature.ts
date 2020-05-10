import { ISetting } from '../interfaces/schemasinterfaces'

export abstract class SettingServiceSignature {
    abstract find(where?: any): Promise<ISetting | ISetting[]>

    abstract create(user: ISetting): Promise<ISetting>

    abstract update(user: ISetting, where: object): Promise<number[]>
}