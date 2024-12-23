"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const validedRequest_1 = __importDefault(require("../../middleware/validedRequest"));
const student_validation_1 = require("./student.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
// will call controller function
router.get('/get-students', student_controller_1.studentController.getAllStudent);
router.get('/:id', (0, auth_1.default)('admin', 'faculty'), student_controller_1.studentController.getStudent);
router.patch('/:id', (0, validedRequest_1.default)(student_validation_1.studentValidations.updateStudentValidationSchema), student_controller_1.studentController.updateStudent);
router.delete('/:id', student_controller_1.studentController.deleteStudent);
exports.StudentRoutes = router;
