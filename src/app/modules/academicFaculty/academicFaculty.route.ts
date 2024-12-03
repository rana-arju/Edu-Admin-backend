import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validationRequest from '../../middleware/validedRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.get(
  '/get-academic-faculty',
  academicFacultyController.getSingleAcademicFaculty,
);

router.post(
  '/create-academic-faculty',
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
