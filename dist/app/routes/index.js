"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = require("../modules/user/user.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("../modules/academicDepartment/academicDepartment.route");
const faculty_route_1 = require("../modules/faculty/faculty.route");
const course_route_1 = require("../modules/course/course.route");
const semesterRegistration_route_1 = require("../modules/semesterRegistration/semesterRegistration.route");
const offeredCourse_route_1 = require("../modules/offeredCourse/offeredCourse.route");
const auth_route_1 = require("../modules/auth/auth.route");
const enrolledCourse_route_1 = require("../modules/enrolledCourse/enrolledCourse.route");
const admin_route_1 = require("../modules/admin/admin.route");
const router = (0, express_1.Router)();
const moduleRoute = [
    { path: '/users', route: user_route_1.UserRoutes },
    { path: '/students', route: student_route_1.StudentRoutes },
    { path: '/academic-semester', route: academicSemester_route_1.AcademicSemesterRoutes },
    { path: '/academic-faculty', route: academicFaculty_route_1.AcademicFacultyRoutes },
    { path: '/academic-department', route: academicDepartment_route_1.AcademicDepartmentRoutes },
    { path: '/faculties', route: faculty_route_1.FacultyRoutes },
    { path: '/admin', route: admin_route_1.AdminRoutes },
    { path: '/courses', route: course_route_1.CourseRouter },
    { path: '/semester-registrations', route: semesterRegistration_route_1.SemesterRegistrationRoutes },
    { path: '/offered-course', route: offeredCourse_route_1.OfferedCourseRoutes },
    { path: '/auth', route: auth_route_1.AuthRoutes },
    { path: '/enrolled-course', route: enrolledCourse_route_1.enrolledCourseRoutes },
];
moduleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
