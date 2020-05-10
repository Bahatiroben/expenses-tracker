import {BelongsTo, ForeignKey, Model, Table, Column, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { IExpense, IJob, ISetting, IUser, Trepeat} from '../../../../services/interfaces/schemasinterfaces';
import {User} from './User.model';

@Table
export class Job extends Model implements IJob {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @Column
    title: string;

    @Column
    description: string;

    @Column
    date: Date;

    @Column
    image?: string;

    @Column
    tags?: string;

    @Column
    period: Trepeat;

    @Column
    nextExec: Date

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}