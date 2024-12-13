/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { RegistrationStatus } from './semesterRegistration.constant';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';

const createSemesterRegistrationIntoDb = async (
  payload: ISemesterRegistration,
) => {
  // check any semester upcomming or ongoining
  const isSemesterUpcomingOrOngoing = await SemesterRegistration.findOne({
    $or: [
      {
        status: RegistrationStatus.UPCOMING,
      },
      {
        status: RegistrationStatus.ONGOING,
      },
    ],
  });

  if (isSemesterUpcomingOrOngoing) {
    throw new AppError(
      400,
      `There is a already ${isSemesterUpcomingOrOngoing.status} registered semester!`,
    );
  }
  // check semester exist or not
  const existSemester = await AcademicSemester.findById(
    payload?.academicSemester,
  );
  if (!existSemester) {
    throw new AppError(404, 'This academic smester is not found!');
  }
  // check semester registration or not
  const isExistSemesterRegistration = await SemesterRegistration.findOne({
    academicSemester: payload?.academicSemester,
  });
  if (isExistSemesterRegistration) {
    throw new AppError(409, 'This academic smester is already registration!');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

// Get single semester
const getSingleRegisteredSemesterFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};
// Get all semester
const getAllRegisteredSemesterFromDB = async (
  query: Record<string, unknown>,
) => {
  const registeredSemesterQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await registeredSemesterQuery.modelQuery;
  return result;
};
// Update single semester
const updateSingleRegisterSemestertIntoDB = async (
  id: string,
  payload: Partial<ISemesterRegistration>,
) => {
  const isRegisterdSemesterExist = await SemesterRegistration.findById(id);
  if (!isRegisterdSemesterExist) {
    throw new AppError(404, 'This register semester not found!');
  }
  // if the requested semester is ended, we will not update anything

  if (isRegisterdSemesterExist?.status === RegistrationStatus.ENDED) {
    throw new AppError(400, 'This semester is already Ended!');
  }
  if (
    isRegisterdSemesterExist?.status === RegistrationStatus.UPCOMING &&
    payload?.status === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      400,
      'you can not directly change status UPCOMING to ENDED!',
    );
  }
  if (
    isRegisterdSemesterExist?.status === RegistrationStatus.ONGOING &&
    payload?.status === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(400, 'you can not reverse status ONGOING to UPCOMING!');
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
// Delete Semester Registration
const deleteSemesterRegistrationFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      404,
      'This registered semester is not found !',
    );
  }

  // checking if the status is still "UPCOMING"
  const semesterRegistrationStatus = isSemesterRegistrationExists.status;

  if (semesterRegistrationStatus !== 'UPCOMING') {
    throw new AppError(
      400,
      `You can not update as the registered semester is ${semesterRegistrationStatus}`,
    );
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedOfferedCourse = await OfferedCourse.deleteMany(
      {
        semesterRegistration: id,
      },
      {
        session,
      },
    );

    if (!deletedOfferedCourse) {
      throw new AppError(
        400,
        'Failed to delete semester registration !',
      );
    }

    const deletedSemisterRegistration =
      await SemesterRegistration.findByIdAndDelete(id, {
        session,
        new: true,
      });

    if (!deletedSemisterRegistration) {
      throw new AppError(
        400,
        'Failed to delete semester registration !',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return null;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDb,
  getSingleRegisteredSemesterFromDB,
  updateSingleRegisterSemestertIntoDB,
  getAllRegisteredSemesterFromDB,
  deleteSemesterRegistrationFromDB,
};
