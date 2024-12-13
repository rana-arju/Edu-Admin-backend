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
exports.semesterRegistrationController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const semesterRegistration_service_1 = require("./semesterRegistration.service");
const createAcademicSemesterRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service func to send this data
    const result = yield semesterRegistration_service_1.semesterRegistrationServices.createSemesterRegistrationIntoDb(req.body);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Create semester registration succesfully',
        data: result,
    });
}));
const getSingleRegisteredSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
    // will call service func to send this data
    const result = yield semesterRegistration_service_1.semesterRegistrationServices.getSingleRegisteredSemesterFromDB(id);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Registered Semester get succesfully',
        data: result,
    });
}));
const getAllRegisteredSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service func to send this data
    const result = yield semesterRegistration_service_1.semesterRegistrationServices.getAllRegisteredSemesterFromDB(req.query);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Register Semester get succesfully',
        data: result,
    });
}));
const updateSingleRegisteredSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const payload = req.body;
    // will call service func to send this data
    const result = yield semesterRegistration_service_1.semesterRegistrationServices.updateSingleRegisterSemestertIntoDB(id, payload);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Semester Registration updated succesfully',
        data: result,
    });
}));
const deleteSemesterRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield semesterRegistration_service_1.semesterRegistrationServices.deleteSemesterRegistrationFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Semester Registration is updated successfully',
        data: result,
    });
}));
exports.semesterRegistrationController = {
    createAcademicSemesterRegistration,
    getSingleRegisteredSemester,
    updateSingleRegisteredSemester,
    getAllRegisteredSemester,
    deleteSemesterRegistration,
};
