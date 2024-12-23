"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userSchemaValidation = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: 'Password must be a string',
    })
        .max(20, 'Password can not be 20 characters')
        .optional(),
});
const userStatusChangeValidation = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(['in-progress', 'blocked']),
    }),
});
exports.userValidation = {
    userStatusChangeValidation,
    userSchemaValidation,
};
