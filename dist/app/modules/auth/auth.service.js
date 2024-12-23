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
exports.authServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_utils_1 = require("./auth.utils");
const sendEmail_1 = require("../../utils/sendEmail");
const loginUsertIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // user exists or not found
    //const user = await User.findOne({ id: payload?.id }).select('+password');
    const user = yield user_model_1.User.isUserExistByCustomId(payload === null || payload === void 0 ? void 0 : payload.id);
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
    // checking password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(403, 'Password mismatch');
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.refresh, config_1.default.refresh_time);
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.token, config_1.default.token_time);
    //access granted for login user
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange,
    };
});
const passwordChnageIntoDB = (user, passwordData) => __awaiter(void 0, void 0, void 0, function* () {
    const isUser = yield user_model_1.User.isUserExistByCustomId(user === null || user === void 0 ? void 0 : user.userId);
    if (!isUser) {
        throw new AppError_1.default(404, 'User not found');
    }
    //checking is user already deleted
    const isDeleted = isUser === null || isUser === void 0 ? void 0 : isUser.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(403, 'User already deleted');
    }
    //checking is user blocked or not allowed
    const isBlocked = (isUser === null || isUser === void 0 ? void 0 : isUser.status) === 'blocked';
    if (isBlocked) {
        throw new AppError_1.default(403, 'User already blocked');
    }
    // checking password is correct
    if (!(yield user_model_1.User.isPasswordMatched(passwordData === null || passwordData === void 0 ? void 0 : passwordData.oldPassword, isUser === null || isUser === void 0 ? void 0 : isUser.password))) {
        throw new AppError_1.default(403, 'Password mismatch');
    }
    //has new password
    const newHashPassword = yield bcrypt_1.default.hash(passwordData.newPassword, Number(config_1.default.salt_rounds));
    yield user_model_1.User.findOneAndUpdate({
        id: user === null || user === void 0 ? void 0 : user.userId,
        role: user === null || user === void 0 ? void 0 : user.role,
    }, {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangeTime: new Date(),
    });
    return null;
});
const refreshTokenFromCookie = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new AppError_1.default(401, 'You are unauthorized to access');
    }
    // if token is valid check
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.refresh);
    const { userId, iat } = decoded;
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
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.token, config_1.default.token_time);
    return { accessToken };
});
const forgetPasswordIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUser = yield user_model_1.User.isUserExistByCustomId(id);
    if (!isUser) {
        throw new AppError_1.default(404, 'User not found');
    }
    //checking is user already deleted
    const isDeleted = isUser === null || isUser === void 0 ? void 0 : isUser.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(403, 'User already deleted');
    }
    //checking is user blocked or not allowed
    const isBlocked = (isUser === null || isUser === void 0 ? void 0 : isUser.status) === 'blocked';
    if (isBlocked) {
        throw new AppError_1.default(403, 'User already blocked');
    }
    const jwtPayload = {
        userId: isUser === null || isUser === void 0 ? void 0 : isUser.id,
        role: isUser === null || isUser === void 0 ? void 0 : isUser.role,
    };
    const resetToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.token, '10m');
    const resetUILink = `${config_1.default.reset_pass_url}?id=${isUser.id}&token=${resetToken}`;
    console.log(resetUILink);
    (0, sendEmail_1.sendEmail)(isUser.email, resetUILink);
});
const resetPasswordIntoDB = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const isUser = yield user_model_1.User.isUserExistByCustomId(payload === null || payload === void 0 ? void 0 : payload.id);
    if (!isUser) {
        throw new AppError_1.default(404, 'User not found');
    }
    //checking is user already deleted
    const isDeleted = isUser === null || isUser === void 0 ? void 0 : isUser.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(403, 'User already deleted');
    }
    //checking is user blocked or not allowed
    const isBlocked = (isUser === null || isUser === void 0 ? void 0 : isUser.status) === 'blocked';
    if (isBlocked) {
        throw new AppError_1.default(403, 'User already blocked');
    }
    // if token is valid check
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.token);
    const { userId, role } = decoded;
    if (userId !== isUser.id || payload.id !== userId) {
        throw new AppError_1.default(403, 'You are not authorized !');
    }
    //has new password
    const newHashPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.salt_rounds));
    yield user_model_1.User.findOneAndUpdate({
        id: userId,
        role,
    }, {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangeTime: new Date(),
    });
});
exports.authServices = {
    loginUsertIntoDB,
    passwordChnageIntoDB,
    refreshTokenFromCookie,
    forgetPasswordIntoDB,
    resetPasswordIntoDB,
};
