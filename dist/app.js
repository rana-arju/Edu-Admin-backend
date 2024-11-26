"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const notFound_1 = require("./app/middleware/notFound");
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
//json parser
app.use(express_1.default.json());
// cors
app.use((0, cors_1.default)());
// application routes
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send('Server is Working...');
});
// Error-handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.notFound);
exports.default = app;
