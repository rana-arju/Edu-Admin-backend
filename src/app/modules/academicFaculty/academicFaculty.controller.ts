import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { acadmicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result = await acadmicFacultyServices.createAcademicFacultyIntoDb(
    req.body,
  );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Create academic faculty succesfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;

  // will call service func to send this data
  const result =
    await acadmicFacultyServices.getSingleAcademicFacultiesFromDB(id);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic faculty get succesfully',
    data: result,
  });
});
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result = await acadmicFacultyServices.getAllAcademicFacultiesFromDB();

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic faculty get succesfully',
    data: result,
  });
});
const updateSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  // will call service func to send this data
  const result = await acadmicFacultyServices.updateSingleAcademicFacultyIntoDB(
    id,
    payload,
  );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic faculty updated succesfully',
    data: result,
  });
});

// student delete

const deleteAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;

  // will call service func to send this data
  await acadmicFacultyServices.deleteSingleAcademicFacultyFromDB(id);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic faculty deleted succesful',
    data: {},
  });
});

export const academicFacultyController = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  deleteAcademicFaculty,
  updateSingleAcademicFaculty,
  getAllAcademicFaculty,
};
