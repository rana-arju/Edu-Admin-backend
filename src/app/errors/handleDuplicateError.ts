/* eslint-disable @typescript-eslint/no-explicit-any */
import { IErrorSources, IGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): IGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: IErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorSources,
  };
};

export default handleDuplicateError;
