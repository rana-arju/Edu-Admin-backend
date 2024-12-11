"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseValidation = void 0;
const zod_1 = require("zod");
const offeredCourse_constant_1 = require("./offeredCourse.constant");
const timeStringSchema = zod_1.z.string().refine((time) => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
}, { message: "Invalid time format. Expected 'HH:MM' in 24 hours format" });
const createOfferedCourseSchemaValidation = zod_1.z.object({
    body: zod_1.z
        .object({
        semesterRegistration: zod_1.z.string(),
        academicFaculty: zod_1.z.string(),
        academicDepartment: zod_1.z.string(),
        course: zod_1.z.string(),
        faculty: zod_1.z.string(),
        maxCapacity: zod_1.z.number(),
        section: zod_1.z.number(),
        days: zod_1.z.array(zod_1.z.enum([...offeredCourse_constant_1.Days])),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
    })
        .refine((body) => {
        const start = new Date(`2000-03-18T${body.startTime}:00`);
        const end = new Date(`2000-03-18T${body.endTime}:00`);
        return end > start;
    }, { message: 'Start time should be before End time!' }),
});
const updateOfferedCourseSchemaValidation = zod_1.z.object({
    body: zod_1.z
        .object({
        faculty: zod_1.z.string(),
        maxCapacity: zod_1.z.number(),
        section: zod_1.z.number(),
        days: zod_1.z.array(zod_1.z.enum([...offeredCourse_constant_1.Days])),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
    })
        .refine((body) => {
        const start = new Date(`2000-03-18T${body.startTime}:00`);
        const end = new Date(`2000-03-18T${body.endTime}:00`);
        return end > start;
    }, { message: 'Start time should be before End time!' }),
});
exports.offeredCourseValidation = {
    createOfferedCourseSchemaValidation,
    updateOfferedCourseSchemaValidation,
};
