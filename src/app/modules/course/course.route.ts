import express from 'express';
import validationRequest from '../../middleware/validedRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';

const router = express.Router();

router.get(
  '/get-academic-department',
  courseController.getAllCourses
);

router.post(
  '/create-academic-department',
  validationRequest(courseValidation.CreateCourseSchemaValidation),

  courseController.createCourse,
);
router.get('/:id', courseController.getSingleCourse);
router.patch(
  '/:id',
  validationRequest(courseValidation.UpdateCoursetSchemaValidation),
  courseController.updateSingleCourse
);
router.delete('/:id', courseController.deleteCourse);

export const CourseRouter = router;
