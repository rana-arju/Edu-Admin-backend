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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    id: { type: String, unique: true },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Email address is required.'],
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: '{VALUE} is not valid email type.',
        },
    },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangeTime: { type: Date },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
    },
    role: {
        type: String,
        enum: ['faculty', 'student', 'admin', 'superAdmin'],
    },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.salt_rounds));
        next();
    });
});
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
userSchema.statics.isUserExistByCustomId = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ id }).select('+password');
    });
};
userSchema.statics.isPasswordMatched = function (plainTextpassword, hashPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextpassword, hashPassword);
    });
};
userSchema.statics.isJWTIssuedBeforePasswordChange = function (passwordChange, jwtIssuesTimeStamp) {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordChangeTime = new Date(passwordChange).getTime() / 1000;
        //console.log(passwordChangeTime > jwtIssuesTimeStamp);
        return passwordChangeTime > jwtIssuesTimeStamp;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
