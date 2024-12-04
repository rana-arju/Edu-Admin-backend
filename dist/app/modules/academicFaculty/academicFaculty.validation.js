"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyValidation = void 0;
const zod_1 = require("zod");
const CreateAcademicFacultySchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Academic Faculty must be a string',
        }),
    }),
});
const UpdateAcademicFacultySchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Academic Faculty must be a string',
        }),
    }),
});
exports.AcademicFacultyValidation = {
    CreateAcademicFacultySchemaValidation,
    UpdateAcademicFacultySchemaValidation,
};
