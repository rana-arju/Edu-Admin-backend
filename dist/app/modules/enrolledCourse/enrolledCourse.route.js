"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolledCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const enrolledCourse_controller_1 = require("./enrolledCourse.controller");
const validedRequest_1 = __importDefault(require("../../middleware/validedRequest"));
const enrolledCourse_validation_1 = require("./enrolledCourse.validation");
const router = express_1.default.Router();
router.post('/create-enrolled-course', (0, validedRequest_1.default)(enrolledCourse_validation_1.enrolledCourseValidation.createEnrolledCourseSchemaValidation), enrolledCourse_controller_1.enrolledCourseController.createEnrolledCourse);
exports.enrolledCourseRoutes = router;
