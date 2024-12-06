"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    const errorSources = error.issues.map((issuse) => {
        return {
            path: issuse === null || issuse === void 0 ? void 0 : issuse.path[issuse.path.length - 1],
            message: issuse === null || issuse === void 0 ? void 0 : issuse.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'validation error',
        errorSources,
    };
};
exports.default = handleZodError;
