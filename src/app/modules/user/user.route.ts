import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validationRequest from '../../middleware/validedRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
const router = express.Router();

// will call controller function

router.post(
  '/create-student',
  validationRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent,
);
router.post(
  '/create-faculty',
  validationRequest(createFacultyValidationSchema),
  userController.createFaculty,
);


router.post(
  '/create-admin',
  validationRequest(createAdminValidationSchema),
  userController.createAdmin,
); 

export const UserRoutes = router;
