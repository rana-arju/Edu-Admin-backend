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
exports.acadmicDepartmentServices = void 0;
const course_model_1 = require("./course.model");
const createCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.create(payload);
    return result;
});
// Get single semester
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id).populate('academicFaculty');
    return result;
});
// Get all semester
const getAllCourseFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.find().populate('academicFaculty');
    return result;
});
// Update single semester
const updateSingleCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// Delete single semester
const deleteSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.deleteOne({ _id: id });
    return result;
});
exports.acadmicDepartmentServices = {
    createCourseIntoDb,
    getSingleCourseFromDB,
    updateSingleCourseIntoDB,
    deleteSingleCourseFromDB,
    getAllCourseFromDB,
};
