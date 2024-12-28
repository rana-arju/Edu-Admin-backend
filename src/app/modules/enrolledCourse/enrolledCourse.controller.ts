import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { enrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const id = req?.user?.userId;
  const payload = req.body;
  // will call service func to send this data
  const result = await enrolledCourseServices.createEnrolledCourseIntoDb(
    payload,
    id,
  );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course enrolled successfully',
    data: result,
  });
});
const updateEnrolledCourse = catchAsync(async (req, res) => {
  const id = req?.user?.userId;
  const payload = req.body;
  // will call service func to send this data
  const result = await enrolledCourseServices.updateEnrolledCourseIntoDb(
    payload,
    id,
  );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'student course mark updated succesful',
    data: result,
  });
});

export const enrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourse,
};
