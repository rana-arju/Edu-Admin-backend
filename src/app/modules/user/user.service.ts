import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.schema';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudent } from './user.utils';
import AppError from '../../errors/AppError';

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
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudent(admissionSemesterId);
    // Create user (transetion - 1)
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // create student (transection - 2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(400, 'Failed to create Student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
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
