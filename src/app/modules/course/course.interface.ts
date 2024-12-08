import { Types } from 'mongoose';

export type IpreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};
export type ICourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [IpreRequisiteCourses];
  isDeleted?: boolean;
};

export type ICourseFaculties = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
