
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';



const getAllStudent = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result = await StudentServices.getAllStudentFromDB();

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Students get succesfully',
    data: result,
  });
});

const getStudent = catchAsync(async (req, res) => {
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
});

// student delete

const deleteStudent = catchAsync(async (req, res) => {
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
});

export const studentController = {
  getAllStudent,
  getStudent,
  deleteStudent,
};
