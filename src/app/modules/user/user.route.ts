import express from 'express';
import { userController } from './user.controller';
const router = express.Router();

// will call controller function

router.post('/create-student', userController.createStudent);

export const UserRoutes = router;
