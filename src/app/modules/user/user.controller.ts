import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  //const zodParsedData = userSchemaValidation.parse(studentData);

  // will call service func to send this data
  const result = await UserServices.createStudentIntoDB(password, studentData);

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

  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});
export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
