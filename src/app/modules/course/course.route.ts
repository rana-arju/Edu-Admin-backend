import express from 'express';
import validationRequest from '../../middleware/validedRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty,
    USER_ROLE.superAdmin,
  ),
  courseController.getAllCourses,
);

router.post(
  '/create-course',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validationRequest(courseValidation.CreateCourseSchemaValidation),

  courseController.createCourse,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  courseController.getSingleCourse,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validationRequest(courseValidation.UpdateCoursetSchemaValidation),
  courseController.updateSingleCourse,
);
router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validationRequest(courseValidation.facultyWithCourseValidation),
  courseController.assignFaculties,
);
router.get(
  '/:courseId/get-faculties',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  courseController.getCourseFaculty,
);
router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validationRequest(courseValidation.facultyWithCourseValidation),
  courseController.removeFacultyFromCourse,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  courseController.deleteCourse,
);

export const CourseRouter = router;
