import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUsertIntoDB = async (payload: ILoginUser) => {
  // user exists or not found

  const user = await User.findOne({ id: payload?.id }).select('+password');

  if (!(await User.isUserExistByCustomId(payload?.id))) {
    throw new AppError(404, 'User not found');
  }

  //checking is user already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, 'User already deleted');
  }
  //checking is user blocked or not allowed
  const isBlocked = user?.status === 'blocked';
  if (isBlocked) {
    throw new AppError(403, 'User already blocked');
  }
  // checking password is correct
  if (
    !(await User.isPasswordMatched(payload?.password, user?.password as string))
  ) {
    throw new AppError(403, 'Password mismatch');
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = Jwt.sign(jwtPayload, config.token as string, {
    expiresIn: '30d',
  });
  //access granted for login user

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const passwordChnageIntoDB = async (
  user: { userId: string; role: string },
  passwordData: { oldPassword: string; newPassword: string },
) => {
  const isUser = await User.findOne({ id: user?.userId }).select('+password');

  if (!(await User.isUserExistByCustomId(user?.userId))) {
    throw new AppError(404, 'User not found');
  }

  //checking is user already deleted
  const isDeleted = isUser?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, 'User already deleted');
  }
  //checking is user blocked or not allowed
  const isBlocked = isUser?.status === 'blocked';
  if (isBlocked) {
    throw new AppError(403, 'User already blocked');
  }
  // checking password is correct

  if (
    !(await User.isPasswordMatched(
      passwordData?.oldPassword,
      isUser?.password as string,
    ))
  ) {
    throw new AppError(403, 'Password mismatch');
  }

  //has new password
  const newHashPassword = await bcrypt.hash(
    passwordData.newPassword,
    Number(config.salt_rounds),
  );
  await User.findOneAndUpdate(
    {
      id: user?.userId,
      role: user?.role,
    },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangeTime: new Date(),
    },
  );
  return null;
};

export const authServices = {
  loginUsertIntoDB,
  passwordChnageIntoDB,
};
