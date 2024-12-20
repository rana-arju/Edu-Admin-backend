import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import jwt from 'jsonwebtoken';
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

  const refreshToken = createToken(
    jwtPayload,
    config.refresh as string,
    config.refresh_time as string,
  );
  const accessToken = createToken(
    jwtPayload,
    config.token as string,
    config.token_time as string,
  );
  //access granted for login user

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const passwordChnageIntoDB = async (
  user: JwtPayload,
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
const refreshTokenFromCookie = async (token: string) => {
  if (!token) {
    throw new AppError(401, 'You are unauthorized to access');
  }

  // if token is valid check
  const decoded = jwt.verify(token, config?.refresh as string) as JwtPayload;

  const {  userId, iat } = decoded;
  const user = await User.isUserExistByCustomId(userId);

  if (!user) {
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
  if (
    user.passwordChangeTime &&
    (await User.isJWTIssuedBeforePasswordChange(
      user.passwordChangeTime,
      iat as number,
    ))
  ) {
    throw new AppError(403, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.token as string,
    config.token_time as string,
  );
  return { accessToken };
};
export const authServices = {
  loginUsertIntoDB,
  passwordChnageIntoDB,
  refreshTokenFromCookie,
};
