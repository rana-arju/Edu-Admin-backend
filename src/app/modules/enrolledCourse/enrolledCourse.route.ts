import express from 'express';
import { enrolledCourseController } from './enrolledCourse.controller';
import validationRequest from '../../middleware/validedRequest';
import { enrolledCourseValidation } from './enrolledCourse.validation';
const router = express.Router();

router.post(
  '/create-enrolled-course',
  validationRequest(
    enrolledCourseValidation.createEnrolledCourseSchemaValidation,
  ),
  enrolledCourseController.createEnrolledCourse,
);

export const enrolledCourseRoutes = router;
