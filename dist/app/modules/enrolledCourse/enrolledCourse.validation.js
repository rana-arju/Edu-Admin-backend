"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolledCourseValidation = void 0;
const zod_1 = require("zod");
const createEnrolledCourseSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        offeredCourse: zod_1.z.string({
            required_error: 'Offered course is required',
        }),
    }),
});
const updateEnrolledCourseSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        courseMarks: zod_1.z.object({
            classTest1: zod_1.z.number().optional(),
            classTest2: zod_1.z.number().optional(),
            midTerm: zod_1.z.number().optional(),
            finalExam: zod_1.z.number().optional(),
        }),
        semesterRegistration: zod_1.z.string(),
        offeredCourse: zod_1.z.string(),
        student: zod_1.z.string(),
    }),
});
exports.enrolledCourseValidation = {
    createEnrolledCourseSchemaValidation,
    updateEnrolledCourseSchemaValidation,
};
