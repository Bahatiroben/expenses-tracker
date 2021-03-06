export interface ILoginUser {
    email: string,
    password: string
}

export interface IUser extends ILoginUser {
    id?: number;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
};

export interface IExpense {
    id?: number;
    userId: number;
    title: string;
    description: string;
    date: Date;
    image?: string;
    tags?: string;
};

export enum Trepeat{ weekly = 7, daily= 1, monthly = 30, annually = 365}

export interface IJob extends IExpense {
    period: Trepeat;
    nextExec: Date;
}

export interface ISetting {
    id?: number;
    twoFactorAuthentication: boolean;
    userId: number;
    deletePeriod?: Trepeat | Date;
}