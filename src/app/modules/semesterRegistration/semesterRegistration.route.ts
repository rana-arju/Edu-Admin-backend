import express from 'express';
import validationRequest from '../../middleware/validedRequest';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validationRequest(
    SemesterRegistrationValidation.CreateSemesterRegistrationSchemaValidation,
  ),

  semesterRegistrationController.createAcademicSemesterRegistration,
);
router.patch(
  '/:id',
  validationRequest(
    SemesterRegistrationValidation.UpdateRegisteredSemesterSchemaValidation,
  ),

  semesterRegistrationController.updateSingleRegisteredSemester,
);
router.delete(
  '/:id',

  semesterRegistrationController.deleteSemesterRegistration,
);
router.get('/:id', semesterRegistrationController.getSingleRegisteredSemester);
router.get('/', semesterRegistrationController.getAllRegisteredSemester);

export const SemesterRegistrationRoutes = router;
