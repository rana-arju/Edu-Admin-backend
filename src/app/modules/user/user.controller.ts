import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
export const userController = {
  createStudent,
};
