import express from "express";
import { studentController } from "./student.controller";
const router = express.Router();


// will call controller function

router.get('/get-students', studentController.getAllStudent);
router.get('/:id', studentController.getStudent);
router.delete('/:id', studentController.deleteStudent);

export const StudentRoutes = router;