import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { semesterRegistrationServices } from './semesterRegistration.service';

const createAcademicSemesterRegistration = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDb(
      req.body,
    );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Create semester registration succesfully',
    data: result,
  });
});

const getSingleRegisteredSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  console.log(id);

  // will call service func to send this data
  const result =
    await semesterRegistrationServices.getSingleRegisteredSemesterFromDB(id);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Registered Semester get succesfully',
    data: result,
  });
});
const getAllRegisteredSemester = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result =
    await semesterRegistrationServices.getAllRegisteredSemesterFromDB(
      req.query,
    );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Register Semester get succesfully',
    data: result,
  });
});
const updateSingleRegisteredSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  // will call service func to send this data
  const result =
    await semesterRegistrationServices.updateSingleRegisterSemestertIntoDB(
      id,
      payload,
    );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Semester Registration updated succesfully',
    data: result,
  });
});

const deleteSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.deleteSemesterRegistrationFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester Registration is updated successfully',
    data: result,
  });
});

export const semesterRegistrationController = {
  createAcademicSemesterRegistration,
  getSingleRegisteredSemester,
  updateSingleRegisteredSemester,
  getAllRegisteredSemester,
  deleteSemesterRegistration,
};
