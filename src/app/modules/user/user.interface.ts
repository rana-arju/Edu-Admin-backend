export type IUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  status: "in-progress" | "block";
  Role: 'user' | 'student' | 'admin';
  Status: boolean;
  isDeleted: boolean;
};
