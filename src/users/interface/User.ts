import { ICommon, RoleUser } from '~/types/common';

export interface IUser extends ICommon {
    email: string;
    password: string;
    role: RoleUser;
}
