import { model, Schema } from 'mongoose';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { semesterRegistrationStatus } from './semesterRegistration.constant';

const academicSemesterRegistrationModel = new Schema<ISemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
      unique: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: semesterRegistrationStatus,
      default: 'UPCOMING',
    },

    minCredit: {
      type: Number,
      required: true,
      default: 3,
    },
    maxCredit: {
      type: Number,
      required: true,
      default: 15,
    },
  },
  { timestamps: true },
);

export const SemesterRegistration = model<ISemesterRegistration>(
  'SemesterRegistration',
  academicSemesterRegistrationModel,
);
