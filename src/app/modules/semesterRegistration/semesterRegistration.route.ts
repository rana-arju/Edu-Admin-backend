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
router.get('/:id', semesterRegistrationController.getSingleAcademicDepartment);
router.get('/', semesterRegistrationController.getAllAcademicDepartment);

export const SemesterRegistrationRoutes = router;
