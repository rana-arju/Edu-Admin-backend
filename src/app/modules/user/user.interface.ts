export type IUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  status: 'in-progress' | 'blocked';
  role: 'faculty' | 'student' | 'admin';
  Status: boolean;
  isDeleted: boolean;
};

