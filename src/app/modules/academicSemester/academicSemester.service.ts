import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';



// Create new Semester

const createAcademicSemesterIntoDb = async (payload: IAcademicSemester) => {
type IAcademicSemesterNameCodeMapper = {
[key: string] : string
};
    const academicSemesterNameCodeMapper: IAcademicSemesterNameCodeMapper = {
      Autumn: '01',
      Summer: '02',
      Fall: '02',
    };
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("Invalid semester code")
    }
  const result = await AcademicSemester.create(payload);
  return result;
};

// Get single semester
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findOne({_id: id});

  return result;
};
export const acadmicSemesterServices = {
  createAcademicSemesterIntoDb,
  getSingleAcademicSemesterFromDB,
};
