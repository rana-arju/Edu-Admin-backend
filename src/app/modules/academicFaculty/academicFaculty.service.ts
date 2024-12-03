import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDb = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// Get single semester
const getSingleAcademicFacultiesFromDB = async (id: string) => {
  const result = await AcademicFaculty.findOne({ _id: id });
  return result;
};
// Get all semester
const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
// Update single semester
const updateSingleAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<IAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// Delete single semester
const deleteSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.deleteOne({ _id: id });
  return result;
};
export const acadmicFacultyServices = {
  createAcademicFacultyIntoDb,
  getSingleAcademicFacultiesFromDB,
  updateSingleAcademicFacultyIntoDB,
  deleteSingleAcademicFacultyFromDB,
  getAllAcademicFacultiesFromDB,
};
