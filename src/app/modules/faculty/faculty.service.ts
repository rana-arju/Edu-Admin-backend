import mongoose from 'mongoose';
import { Student } from './faculty.schema';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IStudent } from './faculty.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableField } from './faculty.constant';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  /*
  let searchTerm = '';
 
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const objectQuery = { ...query };

  const excludeField = ['searchTerm', 'sort', 'limit',"page", "fields"];
  excludeField.forEach((el) => delete objectQuery[el]);

  const searchQuery = Student.find({
    $or: studentSearchableField.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const filterQuery = searchQuery
    .find(objectQuery)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  let sort = '-createdAt';
  if (query?.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);
  let page = 1;
  let skip = 0;
  let limit = 10;

  if (query?.limit) {
    limit = Number(query.limit);
  }
  if (query?.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);
  const limitQuery = paginateQuery.limit(limit);

  // fields limiting
  let fields = '__v';
  if (query?.fields) {
    fields = (query.fields as string).split(',').join(' ');
  }
  const fieldsQuery = await limitQuery.select(fields);

  return fieldsQuery;
  */

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};
const getStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};
const updateStudentFromDB = async (id: string, payload: Partial<IStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(400, 'Failed to delete student!');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete user!');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    // throw new Error('Failed to delete student');
    throw error;
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
