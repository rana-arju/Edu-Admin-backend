import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

// Create new Semester
type IAcademicSemesterNameCodeMapper = {
  [key: string]: string;
};
const academicSemesterNameCodeMapper: IAcademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
const createAcademicSemesterIntoDb = async (payload: IAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

// Get single semester
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);

  return result;
};
// Get all semester
const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
// Update single semester
const updateSingleAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<IAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code!');
  }
  const result = await AcademicSemester.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// Delete single semester
const deleteSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.deleteOne({ _id: id });
  return result;
};
export const acadmicSemesterServices = {
  createAcademicSemesterIntoDb,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterIntoDB,
  deleteSingleAcademicSemesterFromDB,
  getAllAcademicSemesterFromDB,
};
