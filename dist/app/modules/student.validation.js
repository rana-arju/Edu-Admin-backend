"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userNameValidationSchema = joi_1.default.object({
    firstName: joi_1.default.string().trim().required().messages({
        'string.empty': 'First name is required.',
        'any.required': 'First name is required.',
    }),
    lastName: joi_1.default.string().trim().required().messages({
        'string.empty': 'Last name is required.',
        'any.required': 'Last name is required.',
    }),
    middleName: joi_1.default.string().trim().optional(),
});
const guardianValidationSchema = joi_1.default.object({
    fatherName: joi_1.default.string().trim().required().messages({
        'string.empty': "Father's name is required.",
        'any.required': "Father's name is required.",
    }),
    fatherOccupation: joi_1.default.string().trim().required().messages({
        'string.empty': "Father's occupation is required.",
        'any.required': "Father's occupation is required.",
    }),
    fatherContactNo: joi_1.default.string().optional(),
    motherName: joi_1.default.string().trim().required().messages({
        'string.empty': "Mother's name is required.",
        'any.required': "Mother's name is required.",
    }),
    motherOccupation: joi_1.default.string().trim().required().messages({
        'string.empty': "Mother's occupation is required.",
        'any.required': "Mother's occupation is required.",
    }),
    motherContact: joi_1.default.string().optional(),
});
const localGuardianValidationSchema = joi_1.default.object({
    name: joi_1.default.string().trim().required().messages({
        'string.empty': "Local guardian's name is required.",
        'any.required': "Local guardian's name is required.",
    }),
    occupation: joi_1.default.string().optional(),
    contactNo: joi_1.default.string().optional(),
    address: joi_1.default.string().trim().required().messages({
        'string.empty': "Local guardian's address is required.",
        'any.required': "Local guardian's address is required.",
    }),
});
const studentValidationSchema = joi_1.default.object({
    id: joi_1.default.string().required().messages({
        'string.empty': 'Student ID is required.',
        'any.required': 'Student ID is required.',
    }),
    password: joi_1.default.string().min(8).required().label('Password'),
    name: userNameValidationSchema.required().messages({
        'any.required': 'Name field is required.',
    }),
    profileImg: joi_1.default.string().uri().optional(),
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Email address must be valid.',
        'string.empty': 'Email address is required.',
        'any.required': 'Email address is required.',
    }),
    gender: joi_1.default.string().valid('male', 'female', 'other').required().messages({
        'any.only': 'Gender must be one of [male, female, other].',
        'any.required': 'Gender is required.',
    }),
    dateOfBirth: joi_1.default.string().isoDate().optional(),
    contactNo: joi_1.default.string().required().messages({
        'string.empty': 'Contact number is required.',
        'any.required': 'Contact number is required.',
    }),
    emergencyContactNo: joi_1.default.string().required().messages({
        'string.empty': 'Emergency contact number is required.',
        'any.required': 'Emergency contact number is required.',
    }),
    blood: joi_1.default.string()
        .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
        .required()
        .messages({
        'any.only': 'Blood group must be one of [A+, A-, B+, B-, O+, O-, AB+, AB-].',
        'any.required': 'Blood group is required.',
    }),
    presentAddress: joi_1.default.string().trim().required().messages({
        'string.empty': 'Present address is required.',
        'any.required': 'Present address is required.',
    }),
    parmanentAddress: joi_1.default.string().trim().required().messages({
        'string.empty': 'Permanent address is required.',
        'any.required': 'Permanent address is required.',
    }),
    guardian: guardianValidationSchema.required().messages({
        'any.required': 'Guardian information is required.',
    }),
    localGuardian: localGuardianValidationSchema.required().messages({
        'any.required': 'Local guardian information is required.',
    }),
    isActive: joi_1.default.string()
        .valid('active', 'inactive')
        .default('active')
        .messages({
        'any.only': 'isActive must be one of [active, inactive].',
    }),
    isDeleted: joi_1.default.boolean(),
});
exports.default = studentValidationSchema;
