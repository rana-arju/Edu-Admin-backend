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
exports.courseController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const course_service_1 = require("./course.service");
const createCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service func to send this data
    const result = yield course_service_1.courseServices.createCourseIntoDb(req.body);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Create course succesfully',
        data: result,
    });
}));
const getSingleCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // will call service func to send this data
    const result = yield course_service_1.courseServices.getSingleCourseFromDB(id);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Course get succesfully',
        data: result,
    });
}));
const getAllCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    // will call service func to send this data
    const result = yield course_service_1.courseServices.getAllCourseFromDB(query);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Courses get succesfully',
        data: result,
    });
}));
const updateSingleCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const id = req.params.id;
    // const payload = req.body;
    // will call service func to send this data
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Course updated succesfully',
        data: '',
    });
}));
// student delete
const deleteCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // will call service func to send this data
    const result = yield course_service_1.courseServices.deleteSingleCourseFromDB(id);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Course deleted succesful',
        data: result,
    });
}));
exports.courseController = {
    createCourse,
    getSingleCourse,
    deleteCourse,
    updateSingleCourse,
    getAllCourses,
};
