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
    await semesterRegistrationServices.updateSingleAcademicDepartmentIntoDB(
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



export const semesterRegistrationController = {
  createAcademicSemesterRegistration,
  getSingleAcademicDepartment: getSingleRegisteredSemester,
  // deleteAcademicDepartment,
  updateSingleRegisteredSemester,
  getAllAcademicDepartment: getAllRegisteredSemester,
};
