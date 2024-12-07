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

export type IFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: IUserName;
  gender: IGender;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  blood?: IBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

export interface FacultyModel extends Model<IFaculty> {
  isUserExists(id: string): Promise<IFaculty | null>;
}
