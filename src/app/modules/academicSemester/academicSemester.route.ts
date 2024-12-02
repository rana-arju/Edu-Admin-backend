import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middleware/validedRequest';
import { academicValidation } from './academicSemester.validation';
const router = express.Router();

router.get(
  '/:id',
  academicSemesterController.getSingleAcademicSemester,
);

/* router.get(
  '/get-academic-semester',
  academicSemesterController.getSingleAcademicSemester,
); */

router.post(
  '/create-academic-semester',
  validationRequest(academicValidation.AcademicSemesterCreateSchemaValidation),
  academicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
