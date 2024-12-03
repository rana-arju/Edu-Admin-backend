import { model, Schema } from 'mongoose';
import { IAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';

const academicDepartmentModel = new Schema<IAcademicDepartment>(
  {
    name: { type: String, unique: true, required: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
  },
  { timestamps: true },
);

academicDepartmentModel.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new AppError(500, 'This Department Already exist');
  }
  next();
});

academicDepartmentModel.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);
  if (!isDepartmentExist) {
    throw new AppError(404, 'This Department does not exist');
  }
  next();
});
export const AcademicDepartment = model<IAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentModel,
);
