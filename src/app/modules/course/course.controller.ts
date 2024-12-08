import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createCourse = catchAsync(async (req, res) => {
  // will call service func to send this data

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Create course succesfully',
    data: '',
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;

  // will call service func to send this data

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course get succesfully',
    data: '',
  });
});
const getAllCourses = catchAsync(async (req, res) => {
  // will call service func to send this data

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Courses get succesfully',
    data: '',
  });
});
const updateSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

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

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course deleted succesful',
    data: {},
  });
});

export const courseController = {
  createCourse,
  getSingleCourse,
  deleteCourse,
  updateSingleCourse,
  getAllCourses,
};
