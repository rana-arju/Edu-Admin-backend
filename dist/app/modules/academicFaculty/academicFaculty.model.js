"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFaculty = void 0;
const mongoose_1 = require("mongoose");
const academicFacultyModel = new mongoose_1.Schema({
    name: { type: String, required: true },
}, { timestamps: true });
exports.AcademicFaculty = (0, mongoose_1.model)('AcademicFaculty', academicFacultyModel);
