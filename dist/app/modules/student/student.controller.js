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
const student_validation_1 = __importDefault(require("./student.validation"));
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student } = req.body;
        const { error, value } = student_validation_1.default.validate(student);
        // will call service func to send this data
        const result = yield student_service_1.StudentServices.createStudentIntoDB(value);
        if (error) {
            res.status(500).json({
                success: false,
                message: 'Someting went wrong',
                error: error.details,
            });
        }
        // send response
        res.status(200).json({
            success: true,
            message: 'Student is created succesfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Someting went wrong',
            error,
        });
    }
});
const getAllStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // will call service func to send this data
        const result = yield student_service_1.StudentServices.getAllStudentFromDB();
        // send response
        res.status(200).json({
            success: true,
            message: 'Students get succesfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Someting went wrong',
            error,
        });
    }
});
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // will call service func to send this data
        const result = yield student_service_1.StudentServices.getStudentFromDB(id);
        // send response
        res.status(200).json({
            success: true,
            message: 'Student get succesfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Someting went wrong',
            error,
        });
    }
});
// student delete
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // will call service func to send this data
        const result = yield student_service_1.StudentServices.deleteStudentFromDB(id);
        // send response
        res.status(200).json({
            success: true,
            message: 'Student deleted succesful',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Someting went wrong',
            error,
        });
    }
});
exports.studentController = {
    createStudent,
    getAllStudent,
    getStudent,
    deleteStudent,
};
