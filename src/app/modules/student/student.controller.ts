import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllStudent = catchAsync(async (req, res) => {
  // will call service func to send this data
  const searchTerm = req.query;
  const result = await StudentServices.getAllStudentFromDB(searchTerm);

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
  console.log(req.user);

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
// student update

const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { student } = req.body;

  // will call service func to send this data
  const result = await StudentServices.updateStudentFromDB(id, student);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Student updated succesful',
    data: result,
  });
});

export const studentController = {
  getAllStudent,
  getStudent,
  deleteStudent,
  updateStudent,
};
