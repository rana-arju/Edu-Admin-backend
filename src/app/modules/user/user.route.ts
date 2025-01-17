import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validationRequest from '../../middleware/validedRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { userValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';
const router = express.Router();

// will call controller function

router.post(
  '/create-student',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(studentValidations.createStudentValidationSchema),

  userController.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  auth(USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(AdminValidations.createAdminValidationSchema),
  userController.createAdmin,
);
router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validationRequest(userValidation.userStatusChangeValidation),

  userController.userStatusChange,
);
router.get(
  '/me',
  auth(
    USER_ROLE.student,
    USER_ROLE.faculty,
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
  ),
  userController.getMe,
);

export const UserRoutes = router;
