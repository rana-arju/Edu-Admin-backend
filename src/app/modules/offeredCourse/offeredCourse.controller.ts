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
const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const id = req.params.id;

  // will call service func to send this data
  const result = await offeredCourseServices.getSingleOfferedCourseFromDB(id);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Offered Course get succesfully',
    data: result,
  });
});
const getAllOfferedCourse = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result = await offeredCourseServices.getAllOfferedCourseFromDB();

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Offered Course get succesfully',
    data: result,
  });
});
// offered Course delete
const deleteOfferedCourseFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.deleteOfferedCourseFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'OfferedCourse deleted successfully',
    data: result,
  });
});
export const offeredCourseController = {
  createOfferedCourse,
  updateOfferedCourse,
  getSingleOfferedCourse,
  getAllOfferedCourse,
  deleteOfferedCourseFromDB,
};
