import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validationRequest from '../../middleware/validedRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
const router = express.Router();

// will call controller function

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validationRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validationRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  validationRequest(AdminValidations.createAdminValidationSchema),
  userController.createAdmin,
);

export const UserRoutes = router;
