import { authServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const loginUser = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result = await authServices.loginUsertIntoDB(req.body);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'user logged in successful',
    data: result,
  });
});
const chnagePassword = catchAsync(async (req, res) => {
  // will call service func to send this data
  const user = req?.user?.data
  const {...passwordData} = req.body;
 const result = await authServices.passwordChnageIntoDB(user, passwordData);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Password updated successful',
    data: result,
  });
});

export const authController = {
  loginUser,
  chnagePassword,
};
