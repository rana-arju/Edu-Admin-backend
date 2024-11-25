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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const student_schema_1 = require("./student.schema");
const createStudentIntoDB = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield student_schema_1.Student.isUserExists(studentData.id)) {
        throw new Error('User already exists.');
    }
    const result = yield student_schema_1.Student.create(studentData);
    /*
    const student = new Student(studentData);
    if (await student.isUserExists(studentData.id)) {
      throw new Error('User already exists.');
    }
  */
    // const result = await student.save(); // build in instance method provided by mongoose
    return result;
});
const getAllStudentFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_schema_1.Student.find();
    return result;
});
const getStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_schema_1.Student.aggregate([{ $match: { _id: id } }]);
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_schema_1.Student.updateOne({ _id: id }, { isDeleted: true });
    return result;
});
exports.StudentServices = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getStudentFromDB,
    deleteStudentFromDB,
};
