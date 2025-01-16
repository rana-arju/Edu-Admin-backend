import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validationRequest from '../../middleware/validedRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/get-academic-faculty',
  academicFacultyController.getAllAcademicFaculty,
);

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(
    AcademicFacultyValidation.CreateAcademicFacultySchemaValidation,
  ),

  academicFacultyController.createAcademicFaculty,
);
router.get('/:id', academicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/:id',
  validationRequest(
    AcademicFacultyValidation.UpdateAcademicFacultySchemaValidation,
  ),
  academicFacultyController.updateSingleAcademicFaculty,
);
router.delete('/:id', academicFacultyController.deleteAcademicFaculty);

export const AcademicFacultyRoutes = router;
