import { model, Schema } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty.interface';

const academicFacultyModel = new Schema<IAcademicFaculty>(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true },
);

export const AcademicFaculty = model<IAcademicFaculty>(
  'AcademicFaculty',
  academicFacultyModel,
);
