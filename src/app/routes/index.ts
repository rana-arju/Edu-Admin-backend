import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { CourseRouter } from '../modules/course/course.route';

const router = Router();
const moduleRoute = [
  { path: '/users', route: UserRoutes },
  { path: '/students', route: StudentRoutes },
  { path: '/academic-semester', route: AcademicSemesterRoutes },
  { path: '/academic-faculty', route: AcademicFacultyRoutes },
  { path: '/academic-department', route: AcademicDepartmentRoutes },
  { path: '/faculties', route: FacultyRoutes },
  { path: '/courses', route: CourseRouter },
];
moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
