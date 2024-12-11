import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.schema';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
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
    academicFaculty,
    academicDepartment,
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

export const offeredCourseServices = {
  createOfferedCourseIntoDb,

  updateOfferedCourseIntoDB,
};
