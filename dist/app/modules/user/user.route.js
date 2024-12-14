"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const student_validation_1 = require("../student/student.validation");
const validedRequest_1 = __importDefault(require("../../middleware/validedRequest"));
const faculty_validation_1 = require("../faculty/faculty.validation");
const admin_validation_1 = require("../admin/admin.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("./user.constant");
const router = express_1.default.Router();
// will call controller function
router.post('/create-student', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validedRequest_1.default)(student_validation_1.studentValidations.createStudentValidationSchema), user_controller_1.userController.createStudent);
router.post('/create-faculty', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validedRequest_1.default)(faculty_validation_1.createFacultyValidationSchema), user_controller_1.userController.createFaculty);
router.post('/create-admin', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validedRequest_1.default)(admin_validation_1.AdminValidations.createAdminValidationSchema), user_controller_1.userController.createAdmin);
exports.UserRoutes = router;
