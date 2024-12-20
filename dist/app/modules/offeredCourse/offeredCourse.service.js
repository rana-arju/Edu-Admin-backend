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
exports.offeredCourseServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
const course_model_1 = require("../course/course.model");
const faculty_schema_1 = require("../faculty/faculty.schema");
const semesterRegistration_model_1 = require("../semesterRegistration/semesterRegistration.model");
const offeredCourse_model_1 = require("./offeredCourse.model");
const offeredCourse_utils_1 = require("./offeredCourse.utils");
const createOfferedCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, academicDepartment, academicFaculty, course, faculty, section, days, startTime, endTime, } = payload;
    const assignSchedules = yield offeredCourse_model_1.OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');
    const newSchedule = {
        days,
        startTime,
        endTime,
    };
    const timeConFlict = (0, offeredCourse_utils_1.hasTimeConflict)(assignSchedules, newSchedule);
    if (timeConFlict) {
        throw new AppError_1.default(409, 'This faculty is not available at that time, choose other time or day!');
    }
    const isRegisteredSemesterExist = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration);
    if (!isRegisteredSemesterExist) {
        throw new AppError_1.default(404, 'This registration semester not exist!');
    }
    const academicSemester = isRegisteredSemesterExist === null || isRegisteredSemesterExist === void 0 ? void 0 : isRegisteredSemesterExist.academicSemester;
    const isAcademicDepartmentExist = yield academicDepartment_model_1.AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExist) {
        throw new AppError_1.default(404, 'This Academic Department not exist!');
    }
    const isAcademicFacultyExist = yield academicFaculty_model_1.AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExist) {
        throw new AppError_1.default(404, 'This Academic Faculty not exist!');
    }
    const isDepartmentBelongsToFaculty = yield academicDepartment_model_1.AcademicDepartment.findOne({
        academicFaculty,
        _id: academicDepartment,
    });
    if (!isDepartmentBelongsToFaculty) {
        throw new AppError_1.default(404, `This ${isAcademicDepartmentExist === null || isAcademicDepartmentExist === void 0 ? void 0 : isAcademicDepartmentExist.name} is not belongs to ${isAcademicFacultyExist === null || isAcademicFacultyExist === void 0 ? void 0 : isAcademicFacultyExist.name}!`);
    }
    const isCourseExist = yield course_model_1.Course.findById(course);
    if (!isCourseExist) {
        throw new AppError_1.default(404, 'This Course not exist!');
    }
    const isFacultyExist = yield faculty_schema_1.Faculty.findById(faculty);
    if (!isFacultyExist) {
        throw new AppError_1.default(404, 'This Faculty not exist!');
    }
    const isDuplicateOfferedCourse = yield offeredCourse_model_1.OfferedCourse.findOne({
        academicFaculty,
        academicDepartment,
        section,
    });
    if (isDuplicateOfferedCourse) {
        throw new AppError_1.default(400, `Offered course with Same section, same department, same academic faculty already exist`);
    }
    // get the schedeule of the faculties
    const result = yield offeredCourse_model_1.OfferedCourse.create(Object.assign(Object.assign({}, payload), { academicSemester }));
    return result;
});
// Update single semester
const updateOfferedCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { days, startTime, endTime, faculty } = payload;
    const isOfferedCourseExist = yield offeredCourse_model_1.OfferedCourse.findById(id);
    if (!isOfferedCourseExist) {
        throw new AppError_1.default(404, 'This Offered Course not exist!');
    }
    const semesterRegistrationCourseStatus = yield semesterRegistration_model_1.SemesterRegistration.findById(isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.semesterRegistration);
    if ((semesterRegistrationCourseStatus === null || semesterRegistrationCourseStatus === void 0 ? void 0 : semesterRegistrationCourseStatus.status) !== 'UPCOMING') {
        throw new AppError_1.default(400, `You can not this offered course as it is ${semesterRegistrationCourseStatus === null || semesterRegistrationCourseStatus === void 0 ? void 0 : semesterRegistrationCourseStatus.status}`);
    }
    const semesterRegistration = isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.semesterRegistration;
    const assignSchedules = yield offeredCourse_model_1.OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');
    const newSchedule = {
        days,
        startTime,
        endTime,
    };
    const timeConFlict = (0, offeredCourse_utils_1.hasTimeConflict)(assignSchedules, newSchedule);
    if (timeConFlict) {
        throw new AppError_1.default(409, 'This faculty is not available at that time, choose other time or day!');
    }
    const result = yield offeredCourse_model_1.OfferedCourse.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// get single offer course
const getSingleOfferedCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_model_1.OfferedCourse.findById(id);
    return result;
});
// Get all semester
const getAllOfferedCourseFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_model_1.OfferedCourse.find();
    return result;
});
const deleteOfferedCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Step 1: check if the offered course exists
     * Step 2: check if the semester registration status is upcoming
     * Step 3: delete the offered course
     */
    const isOfferedCourseExists = yield offeredCourse_model_1.OfferedCourse.findById(id);
    if (!isOfferedCourseExists) {
        throw new AppError_1.default(404, 'Offered Course not found');
    }
    const semesterRegistation = isOfferedCourseExists.semesterRegistration;
    const semesterRegistrationStatus = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistation).select('status');
    if ((semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status) !== 'UPCOMING') {
        throw new AppError_1.default(400, `Offered course can not update! because the semester ${semesterRegistrationStatus}`);
    }
    const result = yield offeredCourse_model_1.OfferedCourse.findByIdAndDelete(id);
    return result;
});
exports.offeredCourseServices = {
    createOfferedCourseIntoDb,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    deleteOfferedCourseFromDB,
};
