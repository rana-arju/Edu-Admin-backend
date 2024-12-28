import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableField } from './course.constant';
import { ICourse, ICourseFaculties } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';

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
// Get course faculty information
const getCourseFacultyFromDB = async (id: string) => {
  const result = await CourseFaculty.findOne({ course: id }).populate(
    'faculties',
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
  const meta = await courseQuery.countTotal();
  return { result, meta };
};
// Update single semester
const updateSingleCourseIntoDB = async (
  id: string,
  payload: Partial<ICourse>,
) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // step: 1 basic course info update

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updateBasicCourseInfo) {
      throw new AppError(400, 'Failed to update course!');
    }
    // check if there is any pre requisite courses to update

    if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
      // filterout deleted fields
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletePreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        { new: true, runValidators: true, session },
      );
      if (!deletePreRequisiteCourses) {
        throw new AppError(400, 'Failed to update course!');
      }
      // filter out the new course fields
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && el.isDeleted == false,
      );

      const newPreRequisiteCouresesAdd = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: newPreRequisites },
          },
        },
        { new: true, runValidators: true, session },
      );
      if (!newPreRequisiteCouresesAdd) {
        throw new AppError(400, 'Failed to update course!');
      }
    }

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );
    session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
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

// Delete single semester
const facultiesAssignIntoDB = async (
  id: string,
  payload: Partial<ICourseFaculties>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    { course: id, $addToSet: { faculties: { $each: payload } } },
    { upsert: true, new: true },
  );
  return result;
};
const facultyRemoveFromDB = async (
  id: string,
  payload: Partial<ICourseFaculties>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    { $pull: { faculties: { $in: payload } } },
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
  facultiesAssignIntoDB,
  facultyRemoveFromDB,
  getCourseFacultyFromDB,
};
