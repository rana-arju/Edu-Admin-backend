import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
  id: 'S-0001',
  email: 'ranaarju20@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  status: 'in-progress',
  role: USER_ROLE.superAdmin,
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  // when database connected, then we check super admin exist or not, if not exist then we create super admin automatically base on provided data

  const isSuperAdminExist = await User.findOne({ role: 'superAdmin' });
  if (!isSuperAdminExist) {
    await User.create(superUser);
  }
};
export default seedSuperAdmin;
