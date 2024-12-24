import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { enrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result = await enrolledCourseServices.createEnrolledCourseIntoDb(
  
  );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course enrolled succesful',
    data: result,
  });
});

export const enrolledCourseController = {
  createEnrolledCourse,
};
