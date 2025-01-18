import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { JwtPayload } from 'jsonwebtoken';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  //const zodParsedData = userSchemaValidation.parse(studentData);

  // will call service func to send this data
  const result = await UserServices.createStudentIntoDB(
    password,
    studentData,
    req.file,
  );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Student Create successful',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(
    password,
    facultyData,
    req.file,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(
    password,
    adminData,
    req.file,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user as JwtPayload;

  const result = await UserServices.getMeFromDB(userId, role);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'get succesfully',
    data: result,
  });
});

const userStatusChange = catchAsync(async (req, res) => {
  const { status } = req.body;
  console.log(status);
  

  const result = await UserServices.userStatusChangeIntoDB(
    req.params.id,
    status,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Status changed succesfully',
    data: result,
  });
});
export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  userStatusChange,
};
