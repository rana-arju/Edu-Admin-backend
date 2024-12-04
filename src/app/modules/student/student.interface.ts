import { Model, Types } from 'mongoose';

//name

export type IUserName = {
  firstName: string;
  lastName: string;
  middleName?: string;
};
// Guardian
export type IGuardian = {
  fatherName: string;
  fatherOccupation?: string;
  fatherContactNo?: string;
  motherName: string;
  motherOccupation?: string;
  motherContact?: string;
};

// Local Guardian

export type ILocalGuardian = {
  name: string;
  occupation: string;
  contactNo?: string;
  address: string;
};
// Student
export type IStudent = {
  id: string;
  user: Types.ObjectId;
  name: IUserName;
  profileImg?: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  contactNo: string;
  emergencyContactNo: string;
  blood?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  parmanentAddress: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  isDeleted?: boolean;
};

// for static

export interface StudentModel extends Model<IStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<IStudent | null>;
}

// for creating instance
/*
export type IStudentMethods = {
  isUserExists(id: string): Promise<TStudent | null>;
};

// Create a new Model type that knows about IStudentMethod...
export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  IStudentMethods
>;
*/
