"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchemaValidation = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: 'Password must be a string',
    })
        .max(20, 'Password can not be 20 characters')
        .optional(),
});
exports.default = userSchemaValidation;
