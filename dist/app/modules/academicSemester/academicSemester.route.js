"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicSemester_controller_1 = require("./academicSemester.controller");
const validedRequest_1 = __importDefault(require("../../middleware/validedRequest"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), academicSemester_controller_1.academicSemesterController.getAllAcademicSemester);
router.post('/create-academic-semester', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), (0, validedRequest_1.default)(academicSemester_validation_1.academicValidation.AcademicSemesterCreateSchemaValidation), academicSemester_controller_1.academicSemesterController.createAcademicSemester);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), academicSemester_controller_1.academicSemesterController.getSingleAcademicSemester);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), academicSemester_controller_1.academicSemesterController.updateSingleAcademicSemester);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), academicSemester_controller_1.academicSemesterController.deleteAcademicSemester);
exports.AcademicSemesterRoutes = router;
