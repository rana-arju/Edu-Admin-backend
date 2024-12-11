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
exports.academicDepartmentController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const academicDepartment_service_1 = require("./academicDepartment.service");
const createAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service func to send this data
    const result = yield academicDepartment_service_1.acadmicDepartmentServices.createAcademicDepartmentIntoDb(req.body);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Create academic department succesfully',
        data: result,
    });
}));
const getSingleAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // will call service func to send this data
    const result = yield academicDepartment_service_1.acadmicDepartmentServices.getSingleAcademicDepartmentFromDB(id);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Academic department get succesfully',
        data: result,
    });
}));
const getAllAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service func to send this data
    const result = yield academicDepartment_service_1.acadmicDepartmentServices.getAllAcademicDepartmentFromDB(req.query);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Academic department get succesfully',
        data: result,
    });
}));
const updateSingleAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const payload = req.body;
    // will call service func to send this data
    const result = yield academicDepartment_service_1.acadmicDepartmentServices.updateSingleAcademicDepartmentIntoDB(id, payload);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Academic department updated succesfully',
        data: result,
    });
}));
// student delete
const deleteAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // will call service func to send this data
    yield academicDepartment_service_1.acadmicDepartmentServices.deleteSingleAcademicDepartmentFromDB(id);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Academic department deleted succesful',
        data: {},
    });
}));
exports.academicDepartmentController = {
    createAcademicDepartment,
    getSingleAcademicDepartment,
    deleteAcademicDepartment,
    updateSingleAcademicDepartment,
    getAllAcademicDepartment,
};
