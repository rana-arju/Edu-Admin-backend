import { Model } from 'mongoose';

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
  password: string;
  name: TUserName;
  profileImg?: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  blood?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  parmanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  isActive: 'active' | 'inactive';
  isDeleted: boolean;
};

// for static

export interface StudentModel extends Model<TStudent> {
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