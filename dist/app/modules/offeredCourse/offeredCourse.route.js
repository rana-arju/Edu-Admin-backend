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
const user_constant_1 = require("../user/user.constant");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty), offeredCourse_controller_1.offeredCourseController.getAllOfferedCourse);
router.get('/my-offered-courses', (0, auth_1.default)(user_constant_1.USER_ROLE.student), offeredCourse_controller_1.offeredCourseController.getMyOfferedCourse);
router.post('/create-offered-course', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), (0, validedRequest_1.default)(offeredCourse_validation_1.offeredCourseValidation.createOfferedCourseSchemaValidation), offeredCourse_controller_1.offeredCourseController.createOfferedCourse);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), (0, validedRequest_1.default)(offeredCourse_validation_1.offeredCourseValidation.updateOfferedCourseSchemaValidation), offeredCourse_controller_1.offeredCourseController.updateOfferedCourse);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), offeredCourse_controller_1.offeredCourseController.getSingleOfferedCourse);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), offeredCourse_controller_1.offeredCourseController.deleteOfferedCourseFromDB);
exports.OfferedCourseRoutes = router;
