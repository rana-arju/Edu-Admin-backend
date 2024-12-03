import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.schema';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudent } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  /*
  if (await User.isUserExists(userData.id)) {
    throw new Error('User already exists.');
  }
 */
  const userData: Partial<IUser> = {};

  userData.password = password || (config.default_password as string);

  userData.role = 'student';

  // find academic semester info
  const admissionSemesterId = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  userData.id = await generateStudent(admissionSemesterId);
  // Create user
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }

  /* 
  const student = new Student(studentData);
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists.');
  }
*/

  // const result = await student.save(); // build in instance method provided by mongoose
  return newUser;
};

export const UserServices = {
  createUserIntoDB: createStudentIntoDB,
};
