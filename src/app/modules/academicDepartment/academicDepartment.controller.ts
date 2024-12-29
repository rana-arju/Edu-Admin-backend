import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { acadmicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result = await acadmicDepartmentServices.createAcademicDepartmentIntoDb(
    req.body,
  );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Create academic department succesfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;

  // will call service func to send this data
  const result =
    await acadmicDepartmentServices.getSingleAcademicDepartmentFromDB(id);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic department get succesfully',
    data: result,
  });
});
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result = await acadmicDepartmentServices.getAllAcademicDepartmentFromDB(
    req.query,
  );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic department get succesfully',
    data: result?.result,
    meta: result?.meta,
  });
});
const updateSingleAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  // will call service func to send this data
  const result =
    await acadmicDepartmentServices.updateSingleAcademicDepartmentIntoDB(
      id,
      payload,
    );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic department updated succesfully',
    data: result,
  });
});

// student delete

const deleteAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;

  // will call service func to send this data
  await acadmicDepartmentServices.deleteSingleAcademicDepartmentFromDB(id);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic department deleted succesful',
    data: {},
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getSingleAcademicDepartment,
  deleteAcademicDepartment,
  updateSingleAcademicDepartment,
  getAllAcademicDepartment,
};
