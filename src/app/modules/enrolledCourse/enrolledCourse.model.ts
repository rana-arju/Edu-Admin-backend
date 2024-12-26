import { model, Schema } from 'mongoose';
import { ICourseMark, IEnrolledCourse } from './enrolledCourse.interface';
import { Grade } from './enrolledCourse.constant';

const courseMarkSchema = new Schema<ICourseMark>(
  {
    classTest1: { type: Number, min: 0, max: 10, default: 0 },
    classTest2: { type: Number, min: 0, max: 10, default: 0 },
    midTerm: { type: Number, min: 0, max: 30, default: 0 },
    finalTerm: { type: Number, min: 0, max: 50, default: 0 },
  },
  { _id: false },
);
const enrolledCourseSchema = new Schema<IEnrolledCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'SemesterRegistration',
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicSemester',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
    offeredCourse: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'OfferedCourse',
    },
    course: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
    faculty: { type: Schema.Types.ObjectId, required: true, ref: 'Faculty' },
    student: { type: Schema.Types.ObjectId, required: true, ref: 'Student' },
    isEnrolled: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    grade: { type: String, enum: Grade, default: 'NA' },
    gradePoints: { type: Number, min: 0, max: 4, default: 0 },
    courseMarks: { type: courseMarkSchema, default: {} },
  },
  { timestamps: true },
);

export const EnrolledCourse = model<IEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema,
);
