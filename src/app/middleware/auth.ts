import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { IUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are unauthorized to access');
    }

    // if token is valid check
    const decoded = jwt.verify(token, config?.token as string) as JwtPayload;

    const { role, userId, iat } = decoded;
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

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(403, 'You are not authorized to access this resource');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
