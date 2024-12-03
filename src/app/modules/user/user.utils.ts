import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1 , _id: 0}).sort({createdAt: -1}).lean();

  return lastStudent?.id ? lastStudent?.id.substring(6) : undefined;
};

export const generateStudent =async (payload: IAcademicSemester) => {
  const currentId = await findLastStudentId() || (0).toString();
  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');
  increamentId = `${payload.year}${payload.code}${increamentId}`;
  return increamentId;
};
