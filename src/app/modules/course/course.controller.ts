import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  // will call service func to send this data

  const result = await courseServices.createCourseIntoDb(req.body)

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Create course succesfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;

  // will call service func to send this data
  const result = await courseServices.getSingleCourseFromDB(id)

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course get succesfully',
    data: result,
  });
});
const getAllCourses = catchAsync(async (req, res) => {
  const query = req.query
  // will call service func to send this data
const result = await courseServices.getAllCourseFromDB(query)
  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Courses get succesfully',
    data: result,
  });
});
const updateSingleCourse = catchAsync(async (req, res) => {
  //const id = req.params.id;
  // const payload = req.body;

  // will call service func to send this data

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course updated succesfully',
    data: '',
  });
});

// student delete

const deleteCourse = catchAsync(async (req, res) => {
  const id = req.params.id;

  // will call service func to send this data
const result = await courseServices.deleteSingleCourseFromDB(id)
  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course deleted succesful',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getSingleCourse,
  deleteCourse,
  updateSingleCourse,
  getAllCourses,
};
