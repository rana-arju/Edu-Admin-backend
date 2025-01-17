/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.schema';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudent,
} from './user.utils';
import AppError from '../../errors/AppError';
import { IFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.schema';
import { Admin } from '../admin/admin.schema';
import { sendImageToCloudinaryService } from '../../utils/sendImageToCloudinary';

const createStudentIntoDB = async (
  password: string,
  payload: IStudent,
  file: any,
) => {
  const userData: Partial<IUser> = {};

  userData.password = password || (config.default_password as string);
  // set student role
  userData.role = 'student';
  // set student email
  userData.email = payload.email;

  // find academic department info
  const acedemicDepartmentExist = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!acedemicDepartmentExist) {
    throw new AppError(400, 'Invalid academic department');
  }
  payload.academicFaculty = acedemicDepartmentExist.academicFaculty;
  // find academic semester info
  const admissionSemesterId = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemesterId) {
    throw new AppError(400, 'Invalid admission semester');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudent(admissionSemesterId);
    // Create user (transetion - 1)
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    if (file) {
      const image = (await sendImageToCloudinaryService(
        file?.path,
        imageName,
      )) as {
        secure_url: string;
      };
      payload.profileImg = image?.secure_url;
    }

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
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // const result = await student.save(); // build in instance method provided by mongoose
};

const createFacultyIntoDB = async (
  password: string,
  payload: IFaculty,
  file: any,
) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set faculty role
  userData.role = 'faculty';
  // set faculty email
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }
  payload.academicFaculty = academicDepartment?.academicFaculty;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    if (file) {
      const image = (await sendImageToCloudinaryService(
        file?.path,
        imageName,
      )) as {
        secure_url: string;
      };
      payload.profileImg = image?.secure_url;
    }

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(400, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const createAdminIntoDB = async (
  password: string,
  payload: IFaculty,
  file: any,
) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';
  // set admin email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    if (file) {
      const image = (await sendImageToCloudinaryService(
        file?.path,
        imageName,
      )) as {
        secure_url: string;
      };
      payload.profileImg = image?.secure_url;
    }

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(400, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};
const getMeFromDB = async (userId: string, role: string) => {
  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }
  return result;
};

const userStatusChangeIntoDB = async (id: string, status: string) => {
  const user = await User.findByIdAndUpdate(id, { status }, { new: true });
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  return user;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMeFromDB,
  userStatusChangeIntoDB,
};
