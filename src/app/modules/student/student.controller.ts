/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;
    const { error, value } = studentValidationSchema.validate(student);

    // will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(value);
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Someting went wrong',
        error: error.details,
      });
    }

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Someting went wrong',
      error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    // will call service func to send this data
    const result = await StudentServices.getAllStudentFromDB();

    // send response
    res.status(200).json({
      success: true,
      message: 'Students get succesfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Someting went wrong',
      error,
    });
  }
};

const getStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // will call service func to send this data
    const result = await StudentServices.getStudentFromDB(id);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student get succesfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Someting went wrong',
      error,
    });
  }
};

// student delete

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // will call service func to send this data
    const result = await StudentServices.deleteStudentFromDB(id);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student deleted succesful',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Someting went wrong',
      error,
    });
  }
};

export const studentController = {
  createStudent,
  getAllStudent,
  getStudent,
  deleteStudent,
};
