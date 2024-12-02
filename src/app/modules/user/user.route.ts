import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validationRequest from '../../middleware/validedRequest';
const router = express.Router();

// will call controller function

router.post(
  '/create-student',
  validationRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent,
);

export const UserRoutes = router;
