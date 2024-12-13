import express from 'express';
import { offeredCourseController } from './offeredCourse.controller';
import validationRequest from '../../middleware/validedRequest';
import { offeredCourseValidation } from './offeredCourse.validation';
const router = express.Router();

router.get('/get-offered-course', offeredCourseController.getAllOfferedCourse);
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
router.get('/:id', offeredCourseController.getSingleOfferedCourse);
router.delete('/:id', offeredCourseController.deleteOfferedCourseFromDB);

export const OfferedCourseRoutes = router;
