"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';
    res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === 'production' ? undefined : err, // Avoid exposing full error details in production
    });
};
exports.globalErrorHandler = globalErrorHandler;
