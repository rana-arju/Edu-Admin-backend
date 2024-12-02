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
const getAllAcademicSemester = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result = await acadmicSemesterServices.getAllAcademicSemesterFromDB();

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic semester get succesfully',
    data: result,
  });
});
const updateSingleAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  // will call service func to send this data
  const result =
    await acadmicSemesterServices.updateSingleAcademicSemesterIntoDB(
      id,
      payload,
    );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic semester updated succesfully',
    data: result,
  });
});

// student delete

const deleteAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id;

  // will call service func to send this data
  await acadmicSemesterServices.deleteSingleAcademicSemesterFromDB(id);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Semester deleted succesful',
    data: {},
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getSingleAcademicSemester,
  deleteAcademicSemester,
  updateSingleAcademicSemester,
  getAllAcademicSemester,
};
