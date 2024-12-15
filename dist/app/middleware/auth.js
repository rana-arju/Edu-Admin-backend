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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = require("../modules/user/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(401, 'You are unauthorized to access');
        }
        // if token is valid check
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.token);
        const { role, userId, iat } = decoded;
        const user = yield user_model_1.User.isUserExistByCustomId(userId);
        if (!user) {
            throw new AppError_1.default(404, 'User not found');
        }
        //checking is user already deleted
        const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
        if (isDeleted) {
            throw new AppError_1.default(403, 'User already deleted');
        }
        //checking is user blocked or not allowed
        const isBlocked = (user === null || user === void 0 ? void 0 : user.status) === 'blocked';
        if (isBlocked) {
            throw new AppError_1.default(403, 'User already blocked');
        }
        if (user.passwordChangeTime &&
            (yield user_model_1.User.isJWTIssuedBeforePasswordChange(user.passwordChangeTime, iat))) {
            throw new AppError_1.default(403, 'You are not authorized !');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(403, 'You are not authorized to access this resource');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
