import { Default, Model, Table, Column, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { IExpense, IJob, ISetting, IUser, Trepeat} from '../../interfaces/schemasinterfaces';
import {User} from './User.model';

@Table
export class Setting extends Model implements ISetting {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @Default(false)
    @Column
    twoFactorAuthentication: boolean;

    @Column
    deletePeriod?: Trepeat;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}