"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRouter = void 0;
const express_1 = __importDefault(require("express"));
const validedRequest_1 = __importDefault(require("../../middleware/validedRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const router = express_1.default.Router();
router.get('/get-academic-department', course_controller_1.courseController.getAllCourses);
router.post('/create-academic-department', (0, validedRequest_1.default)(course_validation_1.courseValidation.CreateCourseSchemaValidation), course_controller_1.courseController.createCourse);
router.get('/:id', course_controller_1.courseController.getSingleCourse);
router.patch('/:id', (0, validedRequest_1.default)(course_validation_1.courseValidation.UpdateCoursetSchemaValidation), course_controller_1.courseController.updateSingleCourse);
router.delete('/:id', course_controller_1.courseController.deleteCourse);
exports.CourseRouter = router;
