"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const validedRequest_1 = __importDefault(require("../../middleware/validedRequest"));
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.get('/get-academic-faculty', academicFaculty_controller_1.academicFacultyController.getSingleAcademicFaculty);
router.post('/create-academic-faculty', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), (0, validedRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.CreateAcademicFacultySchemaValidation), academicFaculty_controller_1.academicFacultyController.createAcademicFaculty);
router.get('/:id', academicFaculty_controller_1.academicFacultyController.getSingleAcademicFaculty);
router.patch('/:id', (0, validedRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.UpdateAcademicFacultySchemaValidation), academicFaculty_controller_1.academicFacultyController.updateSingleAcademicFaculty);
router.delete('/:id', academicFaculty_controller_1.academicFacultyController.deleteAcademicFaculty);
exports.AcademicFacultyRoutes = router;
