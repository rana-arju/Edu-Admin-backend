import { Model, Types } from 'mongoose';

//name

export type TUserName = {
  firstName: string;
  lastName: string;
  middleName?: string;
};
// Guardian
export type TGuardian = {
  fatherName: string;
  fatherOccupation?: string;
  fatherContactNo?: string;
  motherName: string;
  motherOccupation?: string;
  motherContact?: string;
};

// Local Guardian

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo?: string;
  address: string;
};
// Student
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
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
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  isDeleted?: boolean;
};

// for static

export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id:string): Promise<TStudent | null>;
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