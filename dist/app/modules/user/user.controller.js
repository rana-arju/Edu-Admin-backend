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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, student: studentData } = req.body;
    //const zodParsedData = userSchemaValidation.parse(studentData);
    // will call service func to send this data
    const result = yield user_service_1.UserServices.createStudentIntoDB(password, studentData, req.file);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Student Create successful',
        data: result,
    });
}));
const createFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, faculty: facultyData } = req.body;
    const result = yield user_service_1.UserServices.createFacultyIntoDB(password, facultyData, req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Faculty is created succesfully',
        data: result,
    });
}));
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, admin: adminData } = req.body;
    const result = yield user_service_1.UserServices.createAdminIntoDB(password, adminData, req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Admin is created succesfully',
        data: result,
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = req.user;
    const result = yield user_service_1.UserServices.getMeFromDB(userId, role);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'get succesfully',
        data: result,
    });
}));
const userStatusChange = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.body;
    console.log(status);
    const result = yield user_service_1.UserServices.userStatusChangeIntoDB(req.params.id, status);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Status changed succesfully',
        data: result,
    });
}));
exports.userController = {
    createStudent,
    createFaculty,
    createAdmin,
    getMe,
    userStatusChange,
};
