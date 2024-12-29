import { Response } from 'express';
type IMeta = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};
const sendResponse = <T>(
  res: Response,
  data: {
    statusCode: number;
    message?: string;
    success: boolean;
    data: T;
    meta?: IMeta;
  },
) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data.meta,
  });
};

export default sendResponse;
