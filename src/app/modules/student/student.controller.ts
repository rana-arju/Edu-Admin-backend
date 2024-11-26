/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // will call service func to send this data
    const result = await StudentServices.getAllStudentFromDB();

    // send response

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Students get succesfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    // will call service func to send this data
    const result = await StudentServices.getStudentFromDB(id);

    // send response

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Student get succesfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// student delete

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    // will call service func to send this data
    const result = await StudentServices.deleteStudentFromDB(id);

    // send response

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Student deleted succesful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const studentController = {
  getAllStudent,
  getStudent,
  deleteStudent,
};
