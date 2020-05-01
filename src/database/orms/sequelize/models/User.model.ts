import {Model, Table, Column, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { IExpense, IJob, ISetting, IUser, Trepeat} from '../../interfaces/schemasinterfaces';

@Table
export class User extends Model implements IUser {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    email: string;

    @Column
    phoneNumber?: string;

    @Column
    password: string;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}