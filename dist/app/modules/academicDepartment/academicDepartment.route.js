"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validedRequest_1 = __importDefault(require("../../middleware/validedRequest"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = express_1.default.Router();
router.get('/get-academic-department', academicDepartment_controller_1.academicDepartmentController.getAllAcademicDepartment);
router.post('/create-academic-department', (0, validedRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.CreateAcademicDepartmentSchemaValidation), academicDepartment_controller_1.academicDepartmentController.createAcademicDepartment);
router.get('/:id', academicDepartment_controller_1.academicDepartmentController.getSingleAcademicDepartment);
router.patch('/:id', (0, validedRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.UpdateAcademicDepartmentSchemaValidation), academicDepartment_controller_1.academicDepartmentController.updateSingleAcademicDepartment);
router.delete('/:id', academicDepartment_controller_1.academicDepartmentController.deleteAcademicDepartment);
exports.AcademicDepartmentRoutes = router;
