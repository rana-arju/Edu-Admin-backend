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
exports.enrolledCourseServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const offeredCourse_model_1 = require("../offeredCourse/offeredCourse.model");
const student_schema_1 = require("../student/student.schema");
const enrolledCourse_model_1 = require("./enrolledCourse.model");
const createEnrolledCourseIntoDb = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    // check offered course existence and semester registration
    const isOfferedCourseExist = yield offeredCourse_model_1.OfferedCourse.findById(payload.offeredCourse);
    if (!isOfferedCourseExist) {
        throw new AppError_1.default(404, 'This Offered Course not exist!');
    }
    if (isOfferedCourseExist.maxCapacity <= 0) {
        throw new AppError_1.default(400, 'This course is full!');
    }
    const student = yield student_schema_1.Student.findOne({ id }).select('_id');
    if (!student) {
        throw new AppError_1.default(404, 'This student not exist!');
    }
    const isAlreadyEnrolled = yield enrolledCourse_model_1.EnrolledCourse.findOne({
        offeredCourse: payload.offeredCourse,
        student: student._id,
        semesterRegistration: isOfferedCourseExist.semesterRegistration,
    });
    if (isAlreadyEnrolled) {
        throw new AppError_1.default(400, 'You are already enrolled in this course');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        payload.student = student._id;
        payload.semesterRegistration = isOfferedCourseExist.semesterRegistration;
        payload.offeredCourse = isOfferedCourseExist._id;
        payload.faculty = isOfferedCourseExist.faculty;
        payload.academicDepartment = isOfferedCourseExist.academicDepartment;
        payload.course = isOfferedCourseExist.course;
        payload.academicFaculty = isOfferedCourseExist.academicFaculty;
        payload.academicSemester = isOfferedCourseExist.academicSemester;
        payload.isEnrolled = true;
        const result = yield enrolledCourse_model_1.EnrolledCourse.create([payload], { session });
        if (!result) {
            throw new AppError_1.default(400, 'Failed to enrolled course');
        }
        yield offeredCourse_model_1.OfferedCourse.findByIdAndUpdate(payload.offeredCourse, {
            maxCapacity: isOfferedCourseExist.maxCapacity - 1,
        }, { session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
exports.enrolledCourseServices = {
    createEnrolledCourseIntoDb,
};
