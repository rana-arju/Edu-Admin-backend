"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistration = void 0;
const mongoose_1 = require("mongoose");
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const academicSemesterRegistrationModel = new mongoose_1.Schema({
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true,
        unique: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
        type: String,
        enum: semesterRegistration_constant_1.semesterRegistrationStatus,
        default: 'UPCOMING',
    },
    minCredit: {
        type: Number,
        required: true,
        default: 3,
    },
    maxCredit: {
        type: Number,
        required: true,
        default: 15,
    },
}, { timestamps: true });
exports.SemesterRegistration = (0, mongoose_1.model)('SemesterRegistration', academicSemesterRegistrationModel);
