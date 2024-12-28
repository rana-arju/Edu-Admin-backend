import express from 'express';
import validationRequest from '../../middleware/validedRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/get-academic-department',
  academicDepartmentController.getAllAcademicDepartment,
);

router.post(
  '/create-academic-department',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
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
