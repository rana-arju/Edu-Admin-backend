"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validedRequest_1 = __importDefault(require("../../middleware/validedRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
// will call controller function
router.post('/login', (0, validedRequest_1.default)(auth_validation_1.authValidation.loginSchemaValidation), auth_controller_1.authController.loginUser);
router.post('/change-password', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), (0, validedRequest_1.default)(auth_validation_1.authValidation.changePasswordSchemaValidation), auth_controller_1.authController.chnagePassword);
router.post('/refresh-token', (0, validedRequest_1.default)(auth_validation_1.authValidation.refreshTokenValidations), auth_controller_1.authController.refreshToken);
exports.AuthRoutes = router;
