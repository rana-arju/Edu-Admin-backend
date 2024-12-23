import QueryBuilder from '../../builder/QueryBuilder';
import { academicDepartmentSearchableField } from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: IAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

// Get single semester
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};
// Get all semester
const getAllAcademicDepartmentFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartment.find().populate('academicFaculty'),
    query,
  )
    .search(academicDepartmentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await academicDepartmentQuery.modelQuery;
  return result;
};
// Update single semester
const updateSingleAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<IAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// Delete single semester
const deleteSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.deleteOne({ _id: id });
  return result;
};
export const acadmicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getSingleAcademicDepartmentFromDB,
  updateSingleAcademicDepartmentIntoDB,
  deleteSingleAcademicDepartmentFromDB,
  getAllAcademicDepartmentFromDB,
};
