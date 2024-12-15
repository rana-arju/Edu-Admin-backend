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
exports.FacultyControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const faculty_service_1 = require("./faculty.service");
const getSingleFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield faculty_service_1.FacultyServices.getSingleFacultyFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty is retrieved succesfully',
        data: result,
    });
}));
const getAllFaculties = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const result = yield faculty_service_1.FacultyServices.getAllFacultiesFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Faculties are retrieved succesfully',
        data: result,
    });
}));
const updateFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { faculty } = req.body;
    const result = yield faculty_service_1.FacultyServices.updateFacultyIntoDB(id, faculty);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty is updated succesfully',
        data: result,
    });
}));
const deleteFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield faculty_service_1.FacultyServices.deleteFacultyFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty is deleted succesfully',
        data: result,
    });
}));
exports.FacultyControllers = {
    getAllFaculties,
    getSingleFaculty,
    deleteFaculty,
    updateFaculty,
};
