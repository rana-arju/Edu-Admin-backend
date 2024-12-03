import { model, Schema } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty.interface';

const academicFacultyModel = new Schema<IAcademicFaculty>(
  {
    name: String,
  },
  { timestamps: true },
);

export const AcademicFaculty = model<IAcademicFaculty>(
  'AcademicFaculty',
  academicFacultyModel,
);
