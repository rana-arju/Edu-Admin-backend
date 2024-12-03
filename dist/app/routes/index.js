"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = require("../modules/user/user.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const router = (0, express_1.Router)();
const moduleRoute = [
    { path: '/users', route: user_route_1.UserRoutes },
    { path: '/students', route: student_route_1.StudentRoutes },
    { path: '/academic-semester', route: academicSemester_route_1.AcademicSemesterRoutes },
];
moduleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
