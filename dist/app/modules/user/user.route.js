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
const router = express_1.default.Router();
// will call controller function
router.post('/create-student', (0, validedRequest_1.default)(student_validation_1.studentValidations.createStudentValidationSchema), user_controller_1.userController.createStudent);
exports.UserRoutes = router;
