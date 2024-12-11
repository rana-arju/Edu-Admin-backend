import express from 'express';
import { offeredCourseController } from './offeredCourse.controller';
import validationRequest from '../../middleware/validedRequest';
import { offeredCourseValidation } from './offeredCourse.validation';
const router = express.Router();



router.post(
  '/create-offered-course',
  validationRequest(
    offeredCourseValidation.createOfferedCourseSchemaValidation,
  ),
  offeredCourseController.createOfferedCourse,
);
router.patch(
  '/:id',
  validationRequest(
    offeredCourseValidation.updateOfferedCourseSchemaValidation,
  ),
  offeredCourseController.updateOfferedCourse,
);

export const OfferedCourseRoutes = router;
