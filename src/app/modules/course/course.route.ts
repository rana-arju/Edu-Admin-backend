import express from 'express';
import validationRequest from '../../middleware/validedRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/get-all-course',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  courseController.getAllCourses,
);

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validationRequest(courseValidation.CreateCourseSchemaValidation),

  courseController.createCourse,
);
router.get('/:id', courseController.getSingleCourse);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validationRequest(courseValidation.UpdateCoursetSchemaValidation),
  courseController.updateSingleCourse,
);
router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.admin),
  validationRequest(courseValidation.facultyWithCourseValidation),
  courseController.assignFaculties,
);
router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.admin),
  validationRequest(courseValidation.facultyWithCourseValidation),
  courseController.removeFacultyFromCourse,
);
router.delete('/:id', auth(USER_ROLE.admin), courseController.deleteCourse);

export const CourseRouter = router;
