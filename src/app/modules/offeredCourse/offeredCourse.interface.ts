import { Types } from 'mongoose';

export type IDays = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';

export type IOfferedCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: IDays[];
  startTime: string;
  endTime: string;
};
export type ISchedule = {
  days: IDays[];
  startTime: string;
  endTime: string;
};
