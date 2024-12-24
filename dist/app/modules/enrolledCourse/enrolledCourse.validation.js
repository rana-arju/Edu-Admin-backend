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
exports.enrolledCourseValidation = {
    createEnrolledCourseSchemaValidation,
};
