"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidations = exports.updateFacultyValidationSchema = exports.createFacultyValidationSchema = void 0;
const zod_1 = require("zod");
const faculty_constant_1 = require("./faculty.constant");
const createUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
    }),
    middleName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
exports.createFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        faculty: zod_1.z.object({
            designation: zod_1.z.string(),
            name: createUserNameValidationSchema,
            gender: zod_1.z.enum([...faculty_constant_1.Gender]),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string(),
            emergencyContactNo: zod_1.z.string(),
            blood: zod_1.z.enum([...faculty_constant_1.BloodGroup]),
            presentAddress: zod_1.z.string(),
            permanentAddress: zod_1.z.string(),
            academicDepartment: zod_1.z.string(),
            profileImg: zod_1.z.string(),
        }),
    }),
});
const updateUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20).optional(),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
});
exports.updateFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculty: zod_1.z.object({
            designation: zod_1.z.string().optional(),
            name: updateUserNameValidationSchema,
            gender: zod_1.z.enum([...faculty_constant_1.Gender]).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            contactNo: zod_1.z.string().optional(),
            emergencyContactNo: zod_1.z.string().optional(),
            bloogGroup: zod_1.z.enum([...faculty_constant_1.BloodGroup]).optional(),
            presentAddress: zod_1.z.string().optional(),
            permanentAddress: zod_1.z.string().optional(),
            profileImg: zod_1.z.string().optional(),
            academicDepartment: zod_1.z.string().optional(),
        }),
    }),
});
exports.studentValidations = {
    createFacultyValidationSchema: exports.createFacultyValidationSchema,
    updateFacultyValidationSchema: exports.updateFacultyValidationSchema,
};
