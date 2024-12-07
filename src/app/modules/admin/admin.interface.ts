import { Model, Types } from 'mongoose';

export type IGender = 'male' | 'female' | 'other';
export type IBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type IUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: IUserName;
  gender: IGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  blood?: IBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<IAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<IAdmin | null>;
}
