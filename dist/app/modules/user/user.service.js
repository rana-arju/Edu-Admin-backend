"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const student_schema_1 = require("../student/student.schema");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createStudentIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password || config_1.default.default_password;
    userData.role = 'student';
    // find academic semester info
    const admissionSemesterId = yield academicSemester_model_1.AcademicSemester.findById(payload.admissionSemester);
    if (!admissionSemesterId) {
        throw new AppError_1.default(400, 'Invalid admission semester');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        userData.id = yield (0, user_utils_1.generateStudent)(admissionSemesterId);
        // Create user (transetion - 1)
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(400, 'Failed to create user');
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        // create student (transection - 2)
        const newStudent = yield student_schema_1.Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError_1.default(400, 'Failed to create Student');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
    }
    /*
    const student = new Student(studentData);
    if (await student.isUserExists(studentData.id)) {
      throw new Error('User already exists.');
    }
  */
    // const result = await student.save(); // build in instance method provided by mongoose
});
exports.UserServices = {
    createUserIntoDB: createStudentIntoDB,
};
