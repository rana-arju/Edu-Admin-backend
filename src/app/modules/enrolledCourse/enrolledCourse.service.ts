/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { Student } from '../student/student.schema';
import { IEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourse } from './enrolledCourse.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Course } from '../course/course.model';

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
  const course = await Course.findById(isOfferedCourseExist.course);
  const student = await Student.findOne({ id }, { _id: 1 });
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

  /// check total credit exceeds maxcredit
  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExist.semesterRegistration,
  ).select('maxCredit');
  if (!semesterRegistration) {
    throw new AppError(404, 'This Semester Registration not exist!');
  }
  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExist.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCoursesData',
      },
    },
    {
      $unwind: '$enrolledCoursesData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCoursesData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);
  const totalCredits = enrolledCourses[0]?.totalEnrolledCredits || 0;
  // total enrolled credit + new enrolled course credit > maxCredit

  if (
    totalCredits &&
    totalCredits + course?.credits > semesterRegistration.maxCredit
  ) {
    throw new AppError(400, 'Total credit exceeds max credit');
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
