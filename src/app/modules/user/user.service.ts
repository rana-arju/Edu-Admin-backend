import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.schema';
import { IUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  /*
  if (await User.isUserExists(userData.id)) {
    throw new Error('User already exists.');
  }
 */
  const userData: Partial<IUser> = {};

  userData.password = password || (config.default_password as string);

  userData.role = 'student';
  userData.id = '2025234';
  // Create user
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
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
