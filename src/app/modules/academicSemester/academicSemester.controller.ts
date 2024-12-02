import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { acadmicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result = await acadmicSemesterServices.createAcademicSemesterIntoDb(
    req.body,
  );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Create academic semester succesfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id;

  // will call service func to send this data
  const result =
    await acadmicSemesterServices.getSingleAcademicSemesterFromDB(id);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic semester get succesfully',
    data: result,
  });
});

// student delete

const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id;

  // will call service func to send this data
  const result = await StudentServices.deleteStudentFromDB(id);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Student deleted succesful',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getSingleAcademicSemester,
  deleteStudent,
};
