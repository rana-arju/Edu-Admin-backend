import { Types } from 'mongoose';

export type IGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'NA';
export type ICourseMark = {
  classTest1: number;
  classTest2: number;
  midTerm: number;
  finalExam: number;
};
export type IEnrolledCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  student: Types.ObjectId;
  isEnrolled: boolean;
  isCompleted: boolean;
  grade: IGrade;
  gradePoints: number;
  courseMarks: ICourseMark;
};
