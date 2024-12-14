import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { IUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are unauthorized to access');
    }

    // if token is valid check
    const decoded = jwt.verify(token, config?.token as string) as JwtPayload;

    const role = decoded?.data?.role;

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(403, 'You are not authorized to access this resource');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
