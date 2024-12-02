import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

// Create new Semester

const createAcademicSemesterIntoDb = async (payload: IAcademicSemester) => {
  type IAcademicSemesterNameCodeMapper = {
    [key: string]: string;
  };
  const academicSemesterNameCodeMapper: IAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '02',
  };
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

// Get single semester
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: id });

  return result;
};
// Get all semester
const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
console.log(result);

  return result;
};
// Update single semester
const updateSingleAcademicSemesterIntoDB = async (
  id: string,
  paylod: Partial<IAcademicSemester>,
) => {
  const result = await AcademicSemester.findByIdAndUpdate(id, paylod, {
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
