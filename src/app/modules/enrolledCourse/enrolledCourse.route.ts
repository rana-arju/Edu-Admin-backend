import express from 'express';
import { enrolledCourseController } from './enrolledCourse.controller';
import validationRequest from '../../middleware/validedRequest';
import { enrolledCourseValidation } from './enrolledCourse.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validationRequest(
    enrolledCourseValidation.createEnrolledCourseSchemaValidation,
  ),
  enrolledCourseController.createEnrolledCourse,
);

export const enrolledCourseRoutes = router;
