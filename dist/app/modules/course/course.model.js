"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseFaculty = exports.Course = void 0;
const mongoose_1 = require("mongoose");
const preRequisiteCourseSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
const courseModel = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    prefix: {
        type: String,
        trim: true,
        required: true,
    },
    code: {
        type: Number,
        trim: true,
        required: true,
    },
    credits: {
        type: Number,
        trim: true,
        required: true,
    },
    preRequisiteCourses: [preRequisiteCourseSchema],
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.Course = (0, mongoose_1.model)('Course', courseModel);
const CourseFacultieseModel = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        unique: true,
        required: true,
    },
    faculties: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Faculty' }],
}, { timestamps: true });
exports.CourseFaculty = (0, mongoose_1.model)('CourseFaculty', CourseFacultieseModel);
