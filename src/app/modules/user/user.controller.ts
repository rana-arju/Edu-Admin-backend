import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  //const zodParsedData = userSchemaValidation.parse(studentData);

  // will call service func to send this data
  const result = await UserServices.createUserIntoDB(password, studentData);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Student Create successful',
    data: result,
  });
});
export const userController = {
  createStudent,
};
