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
router.patch(
  '/update-enrolled-course-marks',
  auth(USER_ROLE.faculty),
  validationRequest(
    enrolledCourseValidation.updateEnrolledCourseSchemaValidation,
  ),
  enrolledCourseController.updateEnrolledCourse,
);

export const enrolledCourseRoutes = router;
