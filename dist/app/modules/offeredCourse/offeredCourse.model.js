"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourse = void 0;
const mongoose_1 = require("mongoose");
const offeredCourse_constant_1 = require("./offeredCourse.constant");
const offeredCourseSchema = new mongoose_1.Schema({
    semesterRegistration: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'SemesterRegistration',
    },
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicSemester',
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicFaculty',
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicDepartment',
    },
    course: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Course' },
    faculty: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Faculty' },
    maxCapacity: { type: Number, required: true },
    section: { type: Number, required: true },
    days: [
        {
            type: String,
            enum: offeredCourse_constant_1.Days,
            required: true,
        },
    ],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
}, { timestamps: true });
exports.OfferedCourse = (0, mongoose_1.model)('OfferedCourse', offeredCourseSchema);
