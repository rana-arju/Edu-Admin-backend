import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.schema';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Student } from '../student/student.schema';
import { OfferedCoursesearchAbleField } from './offeredCourse.constant';
import { IOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDb = async (payload: IOfferedCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;
  /**
   * Step 1: check if the semester registration id is exists!
   * Step 2: check if the academic faculty id is exists!
   * Step 3: check if the academic department id is exists!
   * Step 4: check if the course id is exists!
   * Step 5: check if the faculty id is exists!
   * Step 6: check if the department is belong to the  faculty
   * Step 7: check if the same offered course same section in same registered semester exists
   * Step 8: get the schedules of the faculties
   * Step 9: check if the faculty is available at that time. If not then throw error
   * Step 10: create the offered course
   */
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');
  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  const timeConFlict = hasTimeConflict(assignSchedules, newSchedule);
  if (timeConFlict) {
    throw new AppError(
      409,
      'This faculty is not available at that time, choose other time or day!',
    );
  }
  const isRegisteredSemesterExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isRegisteredSemesterExist) {
    throw new AppError(404, 'This registration semester not exist!');
  }
  const academicSemester = isRegisteredSemesterExist?.academicSemester;

  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(404, 'This Academic Department not exist!');
  }
  const isAcademicFacultyExist =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExist) {
    throw new AppError(404, 'This Academic Faculty not exist!');
  }
  const isDepartmentBelongsToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });
  if (!isDepartmentBelongsToFaculty) {
    throw new AppError(
      404,
      `This ${isAcademicDepartmentExist?.name} is not belongs to ${isAcademicFacultyExist?.name}!`,
    );
  }
  const isCourseExist = await Course.findById(course);
  if (!isCourseExist) {
    throw new AppError(404, 'This Course not exist!');
  }
  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(404, 'This Faculty not exist!');
  }
  const isDuplicateOfferedCourse = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  });
  if (isDuplicateOfferedCourse) {
    throw new AppError(
      400,
      `Offered course with Same section, same department, same academic faculty already exist`,
    );
  }

  // get the schedeule of the faculties

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

// Update single semester
const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<IOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { days, startTime, endTime, faculty } = payload;
  const isOfferedCourseExist = await OfferedCourse.findById(id);
  if (!isOfferedCourseExist) {
    throw new AppError(404, 'This Offered Course not exist!');
  }

  const semesterRegistrationCourseStatus = await SemesterRegistration.findById(
    isOfferedCourseExist?.semesterRegistration,
  );

  if (semesterRegistrationCourseStatus?.status !== 'UPCOMING') {
    throw new AppError(
      400,
      `You can not this offered course as it is ${semesterRegistrationCourseStatus?.status}`,
    );
  }

  const semesterRegistration = isOfferedCourseExist?.semesterRegistration;
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');
  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  const timeConFlict = hasTimeConflict(assignSchedules, newSchedule);
  if (timeConFlict) {
    throw new AppError(
      409,
      'This faculty is not available at that time, choose other time or day!',
    );
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
// get single offer course
const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);

  return result;
};

// get my offer course
const getMyOfferedCourseFromDB = async (
  id: string,
  query: Record<string, unknown>,
) => {
  /// pagination setup
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit || 0;
  const studentExist = await Student.findOne({ id });
  if (!studentExist) {
    throw new AppError(404, 'Student not found');
  }

  //current ongoin semester
  const currentOngoingRegisterSemester = await SemesterRegistration.findOne({
    status: 'ONGOING',
  });
  if (!currentOngoingRegisterSemester) {
    throw new AppError(404, 'Semester Registration not found');
  }

  const aggregationQuery = [
    {
      $match: {
        semesterRegistration: currentOngoingRegisterSemester._id,
        academicDepartment: studentExist.academicDepartment,
        academicFaculty: studentExist.academicFaculty,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      '$semesterRegistration',
                      currentOngoingRegisterSemester._id,
                    ],
                  },
                  {
                    $eq: ['$student', studentExist._id],
                  },
                  {
                    $eq: ['$isEnrolled', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'enrolledCourses',
      },
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$student', studentExist._id],
                  },
                  {
                    $eq: ['$isCompleted', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'completedCoursesIds',
      },
    },
    {
      $addFields: {
        isPreRequisitesFulfilled: {
          $or: [
            {
              $eq: ['$course.preRequisiteCourses', []],
            },
            {
              $setIsSubset: [
                '$course.preRequisiteCourses.course',
                '$completedCoursesIds',
              ],
            },
          ],
        },
        isAlreadyEnrolled: {
          $in: [
            '$course._id',
            {
              $map: {
                input: '$enrolledCourses',
                as: 'enroll',
                in: '$$enroll.course',
              },
            },
          ],
        },
      },
    },
    {
      $addFields: {
        completedCourse: {
          $map: {
            input: '$completedCourses',
            as: 'completed',
            in: '$$completed.course',
          },
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisitesFulfilled: true,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];
  const paginationQuery = [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];
  const result = await OfferedCourse.aggregate([
    ...aggregationQuery,
    ...paginationQuery,
  ]);

  const total = (await OfferedCourse.aggregate(aggregationQuery)).length;
  const totalPages = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      totalPages,
      total,
    },
    result,
  };
};
// Get all semester
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(
    OfferedCourse.find()
      .populate('semesterRegistration')
      .populate('academicFaculty')
      .populate('academicDepartment')
      .populate('course')
      .populate('faculty'),

    query,
  )
    .search(OfferedCoursesearchAbleField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await offeredCourseQuery.modelQuery;
  const meta = await offeredCourseQuery.countTotal();
  return { result, meta };
};

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(404, 'Offered Course not found');
  }

  const semesterRegistation = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistation).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      400,
      `Offered course can not update! because the semester ${semesterRegistrationStatus}`,
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);

  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDb,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  getMyOfferedCourseFromDB,
};
