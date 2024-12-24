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
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const student_schema_1 = require("../student/student.schema");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const faculty_schema_1 = require("../faculty/faculty.schema");
const admin_schema_1 = require("../admin/admin.schema");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const createStudentIntoDB = (password, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userData = {};
    userData.password = password || config_1.default.default_password;
    // set student role
    userData.role = 'student';
    // set student email
    userData.email = payload.email;
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
        const imageName = `${userData.id}${(_a = payload === null || payload === void 0 ? void 0 : payload.name) === null || _a === void 0 ? void 0 : _a.firstName}`;
        const image = (yield (0, sendImageToCloudinary_1.sendImageToCloudinaryService)(file === null || file === void 0 ? void 0 : file.path, imageName));
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(400, 'Failed to create user');
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        payload.profileImg = image === null || image === void 0 ? void 0 : image.secure_url;
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
        throw error;
    }
    /*
    const student = new Student(studentData);
    if (await student.isUserExists(studentData.id)) {
      throw new Error('User already exists.');
    }
  */
    // const result = await student.save(); // build in instance method provided by mongoose
});
const createFacultyIntoDB = (password, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || config_1.default.default_password;
    //set faculty role
    userData.role = 'faculty';
    // set faculty email
    userData.email = payload.email;
    // find academic department info
    const academicDepartment = yield academicDepartment_model_1.AcademicDepartment.findById(payload.academicDepartment);
    if (!academicDepartment) {
        throw new AppError_1.default(400, 'Academic department not found');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, user_utils_1.generateFacultyId)();
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session }); // array
        //create a faculty
        if (!newUser.length) {
            throw new AppError_1.default(400, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a faculty (transaction-2)
        const imageName = `${userData.id}${(_a = payload === null || payload === void 0 ? void 0 : payload.name) === null || _a === void 0 ? void 0 : _a.firstName}`;
        const image = (yield (0, sendImageToCloudinary_1.sendImageToCloudinaryService)(file === null || file === void 0 ? void 0 : file.path, imageName));
        payload.profileImg = image === null || image === void 0 ? void 0 : image.secure_url;
        const newFaculty = yield faculty_schema_1.Faculty.create([payload], { session });
        if (!newFaculty.length) {
            throw new AppError_1.default(400, 'Failed to create faculty');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw err;
    }
});
const createAdminIntoDB = (password, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || config_1.default.default_password;
    //set student role
    userData.role = 'admin';
    // set admin email
    userData.email = payload.email;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, user_utils_1.generateAdminId)();
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session });
        //create a admin
        if (!newUser.length) {
            throw new AppError_1.default(400, 'Failed to create admin');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a admin (transaction-2)
        const imageName = `${userData.id}${(_a = payload === null || payload === void 0 ? void 0 : payload.name) === null || _a === void 0 ? void 0 : _a.firstName}`;
        const image = (yield (0, sendImageToCloudinary_1.sendImageToCloudinaryService)(file === null || file === void 0 ? void 0 : file.path, imageName));
        payload.profileImg = image === null || image === void 0 ? void 0 : image.secure_url;
        const newAdmin = yield admin_schema_1.Admin.create([payload], { session });
        if (!newAdmin.length) {
            throw new AppError_1.default(400, 'Failed to create admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newAdmin;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw err;
    }
});
const getMeFromDB = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (role === 'student') {
        result = yield student_schema_1.Student.findOne({ id: userId }).populate('user');
    }
    if (role === 'admin') {
        result = yield admin_schema_1.Admin.findOne({ id: userId }).populate('user');
    }
    if (role === 'faculty') {
        result = yield faculty_schema_1.Faculty.findOne({ id: userId }).populate('user');
    }
    return result;
});
const userStatusChangeIntoDB = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(id, { status }, { new: true });
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    return user;
});
exports.UserServices = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
    getMeFromDB,
    userStatusChangeIntoDB,
};
