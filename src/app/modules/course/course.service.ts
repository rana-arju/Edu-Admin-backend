import { ICourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDb = async (payload: ICourse) => {
  const result = await Course.create(payload);
  return result;
};

// Get single semester
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate('academicFaculty');
  return result;
};
// Get all semester
const getAllCourseFromDB = async () => {
  const result = await Course.find().populate('academicFaculty');
  return result;
};
// Update single semester
const updateSingleCourseIntoDB = async (
  id: string,
  payload: Partial<ICourse>,
) => {
  const result = await Course.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// Delete single semester
const deleteSingleCourseFromDB = async (id: string) => {
  const result = await Course.deleteOne({ _id: id });
  return result;
};
export const acadmicDepartmentServices = {
  createCourseIntoDb,
  getSingleCourseFromDB,
  updateSingleCourseIntoDB,
  deleteSingleCourseFromDB,
  getAllCourseFromDB,
};
