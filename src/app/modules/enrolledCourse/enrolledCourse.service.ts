/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { Student } from '../student/student.schema';
import { IEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourse } from './enrolledCourse.model';

const createEnrolledCourseIntoDb = async (
  payload: IEnrolledCourse,
  id: string,
) => {
  // check offered course existence and semester registration
  const isOfferedCourseExist = await OfferedCourse.findById(
    payload.offeredCourse,
  );
  if (!isOfferedCourseExist) {
    throw new AppError(404, 'This Offered Course not exist!');
  }
  if (isOfferedCourseExist.maxCapacity <= 0) {
    throw new AppError(400, 'This course is full!');
  }

  const student = await Student.findOne({ id }).select('_id');
  if (!student) {
    throw new AppError(404, 'This student not exist!');
  }

  const isAlreadyEnrolled = await EnrolledCourse.findOne({
    offeredCourse: payload.offeredCourse,
    student: student._id,
    semesterRegistration: isOfferedCourseExist.semesterRegistration,
  });
  if (isAlreadyEnrolled) {
    throw new AppError(400, 'You are already enrolled in this course');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    payload.student = student._id;
    payload.semesterRegistration = isOfferedCourseExist.semesterRegistration;
    payload.offeredCourse = isOfferedCourseExist._id;
    payload.faculty = isOfferedCourseExist.faculty;
    payload.academicDepartment = isOfferedCourseExist.academicDepartment;
    payload.course = isOfferedCourseExist.course;
    payload.academicFaculty = isOfferedCourseExist.academicFaculty;
    payload.academicSemester = isOfferedCourseExist.academicSemester;
    payload.isEnrolled = true;

    const result = await EnrolledCourse.create([payload], { session });
    if (!result) {
      throw new AppError(400, 'Failed to enrolled course');
    }
    await OfferedCourse.findByIdAndUpdate(
      payload.offeredCourse,
      {
        maxCapacity: isOfferedCourseExist.maxCapacity - 1,
      },
      { session },
    );
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const enrolledCourseServices = {
  createEnrolledCourseIntoDb,
};
