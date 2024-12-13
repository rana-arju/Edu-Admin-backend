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
const router = express_1.default.Router();
router.post('/create-semester-registration', (0, validedRequest_1.default)(semesterRegistration_validation_1.SemesterRegistrationValidation.CreateSemesterRegistrationSchemaValidation), semesterRegistration_controller_1.semesterRegistrationController.createAcademicSemesterRegistration);
router.patch('/:id', (0, validedRequest_1.default)(semesterRegistration_validation_1.SemesterRegistrationValidation.UpdateRegisteredSemesterSchemaValidation), semesterRegistration_controller_1.semesterRegistrationController.updateSingleRegisteredSemester);
router.delete('/:id', semesterRegistration_controller_1.semesterRegistrationController.deleteSemesterRegistration);
router.get('/:id', semesterRegistration_controller_1.semesterRegistrationController.getSingleRegisteredSemester);
router.get('/', semesterRegistration_controller_1.semesterRegistrationController.getAllRegisteredSemester);
exports.SemesterRegistrationRoutes = router;
