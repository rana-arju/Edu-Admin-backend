import { Response } from 'express';

const sendResponse = <T>(
  res: Response,
  data: {
    statusCode: number;
    message?: string;
    success: boolean;
    data: T;
  },
) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
