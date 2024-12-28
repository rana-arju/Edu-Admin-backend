import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  // will call service func to send this data

  const result = await courseServices.createCourseIntoDb(req.body);

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
  const result = await courseServices.getSingleCourseFromDB(id);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course get succesfully',
    data: result,
  });
});
const getCourseFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;

  // will call service func to send this data
  const result = await courseServices.getCourseFacultyFromDB(id);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course faculty get succesful',
    data: result,
  });
});
const getAllCourses = catchAsync(async (req, res) => {
  const query = req.query;
  // will call service func to send this data
  const result = await courseServices.getAllCourseFromDB(query);
  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Courses get succesfully',
    data: result,
  });
});
const updateSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  // will call service func to send this data
  const result = await courseServices.updateSingleCourseIntoDB(id, payload);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course updated succesfully',
    data: result,
  });
});

// student delete

const deleteCourse = catchAsync(async (req, res) => {
  const id = req.params.id;

  // will call service func to send this data
  const result = await courseServices.deleteSingleCourseFromDB(id);
  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course deleted succesful',
    data: result,
  });
});

// assign Faculties

const removeFacultyFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  // will call service func to send this data
  const result = await courseServices.facultyRemoveFromDB(courseId, faculties);
  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Faculties remove succesful',
    data: result,
  });
});
const assignFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  // will call service func to send this data
  const result = await courseServices.facultiesAssignIntoDB(
    courseId,
    faculties,
  );
  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Faculties assign succesful',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getSingleCourse,
  deleteCourse,
  updateSingleCourse,
  getAllCourses,
  assignFaculties,
  removeFacultyFromCourse,
  getCourseFaculty,
};
