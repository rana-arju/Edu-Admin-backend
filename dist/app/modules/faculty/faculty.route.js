"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const validedRequest_1 = __importDefault(require("../../middleware/validedRequest"));
const faculty_validation_1 = require("./faculty.validation");
const router = express_1.default.Router();
// will call controller function
router.get('/get-students', faculty_controller_1.studentController.getAllStudent);
router.get('/:id', faculty_controller_1.studentController.getStudent);
router.patch('/:id', (0, validedRequest_1.default)(faculty_validation_1.studentValidations.updateStudentValidationSchema), faculty_controller_1.studentController.updateStudent);
router.delete('/:id', faculty_controller_1.studentController.deleteStudent);
exports.StudentRoutes = router;
