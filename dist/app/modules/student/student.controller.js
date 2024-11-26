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
exports.studentController = void 0;
const student_service_1 = require("./student.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const getAllStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // will call service func to send this data
        const result = yield student_service_1.StudentServices.getAllStudentFromDB();
        // send response
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: 'Students get succesfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // will call service func to send this data
        const result = yield student_service_1.StudentServices.getStudentFromDB(id);
        // send response
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: 'Student get succesfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// student delete
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // will call service func to send this data
        const result = yield student_service_1.StudentServices.deleteStudentFromDB(id);
        // send response
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: 'Student deleted succesful',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.studentController = {
    getAllStudent,
    getStudent,
    deleteStudent,
};
