import express from 'express';
import validationRequest from '../../middleware/validedRequest';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-semester-registration',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),

  validationRequest(
    SemesterRegistrationValidation.CreateSemesterRegistrationSchemaValidation,
  ),

  semesterRegistrationController.createAcademicSemesterRegistration,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),

  validationRequest(
    SemesterRegistrationValidation.UpdateRegisteredSemesterSchemaValidation,
  ),

  semesterRegistrationController.updateSingleRegisteredSemester,
);
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),

  semesterRegistrationController.deleteSemesterRegistration,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  semesterRegistrationController.getSingleRegisteredSemester,
);
router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  semesterRegistrationController.getAllRegisteredSemester,
);

export const SemesterRegistrationRoutes = router;
