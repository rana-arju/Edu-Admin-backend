"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidation = void 0;
const zod_1 = require("zod");
const preRequisiteCourses = zod_1.z.object({
    course: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional()
});
const CreateCourseSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            invalid_type_error: 'Course must be a string',
            required_error: 'Course is required',
        }),
        prefix: zod_1.z.string(),
        code: zod_1.z.number(),
        credits: zod_1.z.number(),
        isDeleted: zod_1.z.boolean().optional(),
        preRequisiteCourses: zod_1.z.array(preRequisiteCourses).optional(),
    }),
});
const UpdateCoursetSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            invalid_type_error: 'Course must be a string',
            required_error: 'Course is required',
        }),
        prefix: zod_1.z.string(),
        code: zod_1.z.number(),
        credits: zod_1.z.number(),
        isDeleted: zod_1.z.boolean().optional(),
        preRequisiteCourses: zod_1.z.array(preRequisiteCourses).optional(),
    }),
});
exports.courseValidation = {
    CreateCourseSchemaValidation,
    UpdateCoursetSchemaValidation,
};
