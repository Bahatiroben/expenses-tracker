import {Model, Table, Column, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
export class User extends Model {
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
    image?: string;

    @Column
    password: string;


    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}