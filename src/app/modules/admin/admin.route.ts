import express from 'express';
import { updateAdminValidationSchema } from './admin.validation';
import validationRequest from '../../middleware/validedRequest';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validationRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
