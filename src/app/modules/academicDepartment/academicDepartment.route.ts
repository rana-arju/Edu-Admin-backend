import express from 'express';
import validationRequest from '../../middleware/validedRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.get('/get-academic-department', academicDepartmentController.getAllAcademicDepartment);

router.post(
  '/create-academic-department',
  validationRequest(
    AcademicDepartmentValidation.CreateAcademicDepartmentSchemaValidation,
  ),

  academicDepartmentController.createAcademicDepartment,
);
router.get('/:id', academicDepartmentController.getSingleAcademicDepartment);
router.patch(
  '/:id',
  validationRequest(
    AcademicDepartmentValidation.UpdateAcademicDepartmentSchemaValidation,
  ),
  academicDepartmentController.updateSingleAcademicDepartment,
);
router.delete('/:id', academicDepartmentController.deleteAcademicDepartment);

export const AcademicDepartmentRoutes = router;
