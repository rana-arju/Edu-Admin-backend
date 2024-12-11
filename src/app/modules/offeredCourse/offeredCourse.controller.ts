import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { offeredCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result = await offeredCourseServices.createOfferedCourseIntoDb(
    req.body,
  );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Create offered course succesfully',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  // will call service func to send this data
  const result = await offeredCourseServices.updateOfferedCourseIntoDB(
    id,
    payload,
  );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Offered Course updated succesfully',
    data: result,
  });
});

// student delete

export const offeredCourseController = {
  createOfferedCourse,
 updateOfferedCourse,
};
