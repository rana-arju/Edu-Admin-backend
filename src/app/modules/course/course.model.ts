import { model, Schema } from 'mongoose';
import {
  ICourse,
  ICourseFaculties,
  IpreRequisiteCourses,
} from './course.interface';

const preRequisiteCourseSchema = new Schema<IpreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const courseModel = new Schema<ICourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: Number,
      trim: true,
      required: true,
    },
    credits: {
      type: Number,
      trim: true,
      required: true,
    },
    preRequisiteCourses: [preRequisiteCourseSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Course = model<ICourse>('Course', courseModel);

const CourseFacultieseModel = new Schema<ICourseFaculties>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      unique: true,
      required: true,
    },
    faculties: [{ type: Schema.Types.ObjectId, ref: 'Faculty' }],
  },
  { timestamps: true },
);
export const CourseFaculty = model<ICourseFaculties>(
  'CourseFaculty',
  CourseFacultieseModel,
);
