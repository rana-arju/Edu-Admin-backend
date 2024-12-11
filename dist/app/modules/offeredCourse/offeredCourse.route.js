"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const offeredCourse_controller_1 = require("./offeredCourse.controller");
const validedRequest_1 = __importDefault(require("../../middleware/validedRequest"));
const offeredCourse_validation_1 = require("./offeredCourse.validation");
const router = express_1.default.Router();
router.post('/create-offered-course', (0, validedRequest_1.default)(offeredCourse_validation_1.offeredCourseValidation.createOfferedCourseSchemaValidation), offeredCourse_controller_1.offeredCourseController.createOfferedCourse);
router.patch('/:id', (0, validedRequest_1.default)(offeredCourse_validation_1.offeredCourseValidation.updateOfferedCourseSchemaValidation), offeredCourse_controller_1.offeredCourseController.updateOfferedCourse);
exports.OfferedCourseRoutes = router;
