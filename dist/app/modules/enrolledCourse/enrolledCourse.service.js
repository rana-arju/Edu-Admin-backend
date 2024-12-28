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
const semesterRegistration_model_1 = require("../semesterRegistration/semesterRegistration.model");
const course_model_1 = require("../course/course.model");
const faculty_schema_1 = require("../faculty/faculty.schema");
const enrolledCourse_utils_1 = require("./enrolledCourse.utils");
const createEnrolledCourseIntoDb = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    /**
     * step 1: check offered course existence and semester registration
     * step 2: check if the student is already enrolled in this course
     * step 3: check total credit exceeds maxcredit
     * step 4: create enrollments
     */
    // check offered course existence and semester registration
    const isOfferedCourseExist = yield offeredCourse_model_1.OfferedCourse.findById(payload.offeredCourse);
    if (!isOfferedCourseExist) {
        throw new AppError_1.default(404, 'This Offered Course not exist!');
    }
    if (isOfferedCourseExist.maxCapacity <= 0) {
        throw new AppError_1.default(400, 'This course is full!');
    }
    const student = yield student_schema_1.Student.findOne({ id }, { _id: 1 });
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
    /// check total credit exceeds maxcredit
    const semesterRegistration = yield semesterRegistration_model_1.SemesterRegistration.findById(isOfferedCourseExist.semesterRegistration).select('maxCredit');
    if (!semesterRegistration) {
        throw new AppError_1.default(404, 'This Semester Registration not exist!');
    }
    const enrolledCourses = yield enrolledCourse_model_1.EnrolledCourse.aggregate([
        {
            $match: {
                semesterRegistration: isOfferedCourseExist.semesterRegistration,
                student: student._id,
            },
        },
        {
            $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'enrolledCoursesData',
            },
        },
        {
            $unwind: '$enrolledCoursesData',
        },
        {
            $group: {
                _id: null,
                totalEnrolledCredits: { $sum: '$enrolledCoursesData.credits' },
            },
        },
        {
            $project: {
                _id: 0,
                totalEnrolledCredits: 1,
            },
        },
    ]);
    const totalCredits = ((_a = enrolledCourses[0]) === null || _a === void 0 ? void 0 : _a.totalEnrolledCredits) || 0;
    // total enrolled credit + new enrolled course credit > maxCredit
    const course = yield course_model_1.Course.findById(isOfferedCourseExist.course);
    if (totalCredits &&
        totalCredits + (course === null || course === void 0 ? void 0 : course.credits) > semesterRegistration.maxCredit) {
        throw new AppError_1.default(400, 'Total credit exceeds max credit');
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
const updateEnrolledCourseIntoDb = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { offeredCourse, student, semesterRegistration, courseMarks } = payload;
    const studentExist = yield student_schema_1.Student.findById(student, { _id: 1 });
    if (!studentExist) {
        throw new AppError_1.default(404, 'This student not exist!');
    }
    const isFaculty = yield faculty_schema_1.Faculty.findOne({ id }, { _id: 1 });
    if (!isFaculty) {
        throw new AppError_1.default(400, 'You can not access this resource');
    }
    const isTheCourseBelongsToFaculty = yield enrolledCourse_model_1.EnrolledCourse.findOne({
        faculty: isFaculty._id,
        semesterRegistration,
        student,
        offeredCourse,
    });
    if (!isTheCourseBelongsToFaculty) {
        throw new AppError_1.default(400, 'You can not access this resource');
    }
    // check offered course existence and semester registration
    const isOfferedCourseExist = yield offeredCourse_model_1.OfferedCourse.findById(offeredCourse);
    if (!isOfferedCourseExist) {
        throw new AppError_1.default(404, 'This Offered Course not exist!');
    }
    const isSemesterRegistrationExist = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError_1.default(404, 'This Semester Registration not exist');
    }
    const isAlreadyEnrolled = yield enrolledCourse_model_1.EnrolledCourse.findOne({
        offeredCourse: offeredCourse,
        student,
        semesterRegistration: semesterRegistration,
    });
    if (!isAlreadyEnrolled) {
        throw new AppError_1.default(400, 'This course not enrolled by this user');
    }
    const modifiedCourseData = Object.assign({}, courseMarks);
    if (courseMarks && Object.keys(courseMarks).length) {
        for (const [key, value] of Object.entries(courseMarks)) {
            modifiedCourseData[`courseMarks.${key}`] = value;
        }
    }
    if (courseMarks === null || courseMarks === void 0 ? void 0 : courseMarks.finalTerm) {
        const { classTest1, classTest2, midTerm } = isTheCourseBelongsToFaculty.courseMarks;
        const totalMarks = Math.round(classTest1 + classTest2 + midTerm + (courseMarks === null || courseMarks === void 0 ? void 0 : courseMarks.finalTerm));
        const result = (0, enrolledCourse_utils_1.calculateGradeAndPoints)(totalMarks);
        modifiedCourseData.grade = result.grade;
        modifiedCourseData.gradePoints = result.gradePoints;
        modifiedCourseData.isCompleted = true;
    }
    const result = yield enrolledCourse_model_1.EnrolledCourse.findOneAndUpdate({
        offeredCourse,
        student,
        semesterRegistration,
        faculty: isFaculty._id,
    }, modifiedCourseData, { new: true });
    if (!result) {
        throw new AppError_1.default(400, 'Failed to update course mark');
    }
    return result;
});
exports.enrolledCourseServices = {
    createEnrolledCourseIntoDb,
    updateEnrolledCourseIntoDb,
};
