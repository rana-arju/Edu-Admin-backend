import mongoose from 'mongoose';
import { IErrorSources } from '../interface/error';

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSources: IErrorSources = Object.values(err.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorSources,
  };
};

export default handleValidationError;
