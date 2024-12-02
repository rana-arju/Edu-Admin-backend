import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middleware/validedRequest';
import { academicValidation } from './academicSemester.validation';
const router = express.Router();


router.get(
  '/get-academic-semester',
  academicSemesterController.getAllAcademicSemester,
);

router.post(
  '/create-academic-semester',
  validationRequest(academicValidation.AcademicSemesterCreateSchemaValidation),
  academicSemesterController.createAcademicSemester,
);
router.get(
  '/:id',
  academicSemesterController.getSingleAcademicSemester,
);
router.patch(
  '/:id',
  academicSemesterController.updateSingleAcademicSemester,
);
router.delete(
  '/:id',
  academicSemesterController.deleteAcademicSemester,
);



export const AcademicSemesterRoutes = router;
