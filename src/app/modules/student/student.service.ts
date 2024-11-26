import { Student } from './student.schema';

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { _id: id } }]);

  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ _id: id }, { isDeleted: true });

  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
};
