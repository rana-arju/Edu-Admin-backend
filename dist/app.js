"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const student_route_1 = require("./app/modules/student/student.route");
const app = (0, express_1.default)();
//json parser
app.use(express_1.default.json());
// cors
app.use((0, cors_1.default)());
// application routes
app.use('/api/v1/students', student_route_1.StudentRoutes);
app.get('/', (req, res) => {
    res.send('Server is Working...');
});
exports.default = app;
