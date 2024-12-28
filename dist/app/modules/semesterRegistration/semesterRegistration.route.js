"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistrationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validedRequest_1 = __importDefault(require("../../middleware/validedRequest"));
const semesterRegistration_controller_1 = require("./semesterRegistration.controller");
const semesterRegistration_validation_1 = require("./semesterRegistration.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/create-semester-registration', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), (0, validedRequest_1.default)(semesterRegistration_validation_1.SemesterRegistrationValidation.CreateSemesterRegistrationSchemaValidation), semesterRegistration_controller_1.semesterRegistrationController.createAcademicSemesterRegistration);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), (0, validedRequest_1.default)(semesterRegistration_validation_1.SemesterRegistrationValidation.UpdateRegisteredSemesterSchemaValidation), semesterRegistration_controller_1.semesterRegistrationController.updateSingleRegisteredSemester);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), semesterRegistration_controller_1.semesterRegistrationController.deleteSemesterRegistration);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), semesterRegistration_controller_1.semesterRegistrationController.getSingleRegisteredSemester);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), semesterRegistration_controller_1.semesterRegistrationController.getAllRegisteredSemester);
exports.SemesterRegistrationRoutes = router;
