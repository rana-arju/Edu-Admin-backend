/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeTime?: Date;
  status: 'in-progress' | 'blocked';
  role: 'faculty' | 'student' | 'admin';
  Status: boolean;
  isDeleted: boolean;
}
export interface UserModel extends Model<IUser> {
  isUserExistByCustomId(id: string): Promise<IUser>;
  isPasswordMatched(
    plainTextpassword: string,
    hashPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChange(
    passwordChange: Date,
    jwtIssuesTimeStamp: number,
  ):boolean
}
export type IUserRole = keyof typeof USER_ROLE;