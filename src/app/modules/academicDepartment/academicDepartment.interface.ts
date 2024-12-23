import { Types } from 'mongoose';

export type IAcademicDepartment = {
  name: string;
  academicFaculty: Types.ObjectId;
};
