import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableField } from './course.constant';
import { ICourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDb = async (payload: ICourse) => {
  const result = await Course.create(payload);
  return result;
};

// Get single semester
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
// Get all semester
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
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
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
export const courseServices = {
  createCourseIntoDb,
  getSingleCourseFromDB,
  updateSingleCourseIntoDB,
  deleteSingleCourseFromDB,
  getAllCourseFromDB,
};
