/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { Student } from '../student/student.schema';
import { IEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourse } from './enrolledCourse.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.schema';
import { calculateGradeAndPoints } from './enrolledCourse.utils';

const createEnrolledCourseIntoDb = async (
  payload: IEnrolledCourse,
  id: string,
) => {
  /**
   * step 1: check offered course existence and semester registration
   * step 2: check if the student is already enrolled in this course
   * step 3: check total credit exceeds maxcredit
   * step 4: create enrollments
   */
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
  const course = await Course.findById(isOfferedCourseExist.course);

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

const updateEnrolledCourseIntoDb = async (
  payload: Partial<IEnrolledCourse>,
  id: string,
) => {
  const { offeredCourse, student, semesterRegistration, courseMarks } = payload;

  const studentExist = await Student.findById(student, { _id: 1 });

  if (!studentExist) {
    throw new AppError(404, 'This student not exist!');
  }
  const isFaculty = await Faculty.findOne({ id }, { _id: 1 });

  if (!isFaculty) {
    throw new AppError(400, 'You can not access this resource');
  }
  const isTheCourseBelongsToFaculty = await EnrolledCourse.findOne({
    faculty: isFaculty._id,
    semesterRegistration,
    student,
    offeredCourse,
  });
  if (!isTheCourseBelongsToFaculty) {
    throw new AppError(400, 'You can not access this resource');
  }
  // check offered course existence and semester registration
  const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new AppError(404, 'This Offered Course not exist!');
  }

  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(404, 'This Semester Registration not exist');
  }
  const isAlreadyEnrolled = await EnrolledCourse.findOne({
    offeredCourse: offeredCourse,
    student,
    semesterRegistration: semesterRegistration,
  });
  if (!isAlreadyEnrolled) {
    throw new AppError(400, 'This course not enrolled by this user');
  }
  const modifiedCourseData: Record<string, unknown> = {
    ...courseMarks,
  };
  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedCourseData[`courseMarks.${key}`] = value;
    }
  }
  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm } =
      isTheCourseBelongsToFaculty.courseMarks;

    const totalMarks = Math.round(
      classTest1 + classTest2 + midTerm + courseMarks?.finalTerm,
    );
    const result = calculateGradeAndPoints(totalMarks);
    modifiedCourseData.grade = result.grade;
    modifiedCourseData.gradePoints = result.gradePoints;
    modifiedCourseData.isCompleted = true;
  }

  const result = await EnrolledCourse.findOneAndUpdate(
    {
      offeredCourse,
      student,
      semesterRegistration,
      faculty: isFaculty._id,
    },
    modifiedCourseData,
    { new: true },
  );
  if (!result) {
    throw new AppError(400, 'Failed to update course mark');
  }
  return result;
};
export const enrolledCourseServices = {
  createEnrolledCourseIntoDb,
  updateEnrolledCourseIntoDb,
};
