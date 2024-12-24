
import { EnrolledCourse } from './enrolledCourse.model';

const createEnrolledCourseIntoDb = async () => {
  const result = await EnrolledCourse.create();
  return result;
};

export const enrolledCourseServices = {
  createEnrolledCourseIntoDb,
};
