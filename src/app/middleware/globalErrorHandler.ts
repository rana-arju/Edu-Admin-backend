/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import { IErrorSources } from '../interface/error';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';

  let errorSources: IErrorSources = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name == 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err.name == 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err.code && err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,

    stack: config.node_env === 'production' ? undefined : err.stack, // Avoid exposing full error details in production
  });
};
