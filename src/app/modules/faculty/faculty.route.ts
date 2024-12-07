import express from "express";
import { studentController } from "./faculty.controller";
import validationRequest from "../../middleware/validedRequest";
import { studentValidations } from "./faculty.validation";
const router = express.Router();


// will call controller function

router.get('/get-students', studentController.getAllStudent);
router.get('/:id', studentController.getStudent);
router.patch(
  '/:id',
  validationRequest(studentValidations.updateStudentValidationSchema),
  studentController.updateStudent,
);
router.delete('/:id', studentController.deleteStudent);

export const StudentRoutes = router;