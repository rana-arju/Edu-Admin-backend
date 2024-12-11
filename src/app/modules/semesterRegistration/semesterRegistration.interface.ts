import { Types } from 'mongoose';

export type ISemesterRegistration = {
  academicSemester: Types.ObjectId;
  status: 'ONGOING' | 'ENDED' | 'UPCOMING';
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};
