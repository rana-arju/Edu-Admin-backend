import express from 'express';
import { offeredCourseController } from './offeredCourse.controller';
import validationRequest from '../../middleware/validedRequest';
import { offeredCourseValidation } from './offeredCourse.validation';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';
const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  offeredCourseController.getAllOfferedCourse,
);
router.get(
  '/my-offered-courses',
  auth(USER_ROLE.student),
  offeredCourseController.getMyOfferedCourse,
);
router.post(
  '/create-offered-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(
    offeredCourseValidation.createOfferedCourseSchemaValidation,
  ),
  offeredCourseController.createOfferedCourse,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(
    offeredCourseValidation.updateOfferedCourseSchemaValidation,
  ),
  offeredCourseController.updateOfferedCourse,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  offeredCourseController.getSingleOfferedCourse,
);
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  offeredCourseController.deleteOfferedCourseFromDB,
);

export const OfferedCourseRoutes = router;
