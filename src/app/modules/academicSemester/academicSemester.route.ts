import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middleware/validedRequest';
import { academicValidation } from './academicSemester.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),

  academicSemesterController.getAllAcademicSemester,
);

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(academicValidation.AcademicSemesterCreateSchemaValidation),
  academicSemesterController.createAcademicSemester,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  academicSemesterController.getSingleAcademicSemester,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  academicSemesterController.updateSingleAcademicSemester,
);
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  academicSemesterController.deleteAcademicSemester,
);

export const AcademicSemesterRoutes = router;
