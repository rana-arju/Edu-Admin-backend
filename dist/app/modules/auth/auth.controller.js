"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const config_1 = __importDefault(require("../../config"));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service func to send this data
    const result = yield auth_service_1.authServices.loginUsertIntoDB(req.body);
    const { refreshToken, needsPasswordChange, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
    });
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'user logged in successful',
        data: {
            accessToken,
            needsPasswordChange,
        },
    });
}));
const chnagePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service func to send this data
    const passwordData = __rest(req.body, []);
    const userData = req === null || req === void 0 ? void 0 : req.user;
    const result = yield auth_service_1.authServices.passwordChnageIntoDB(userData, passwordData);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Password updated successful',
        data: result,
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service func to send this data
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.authServices.refreshTokenFromCookie(refreshToken);
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
    });
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'access token get successful',
        data: result,
    });
}));
const forgetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const result = yield auth_service_1.authServices.forgetPasswordIntoDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Reset link is generated successfully',
        data: result,
    });
}));
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield auth_service_1.authServices.resetPasswordIntoDB(req.body, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Password reset successful',
        data: result,
    });
}));
exports.authController = {
    loginUser,
    chnagePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
};
