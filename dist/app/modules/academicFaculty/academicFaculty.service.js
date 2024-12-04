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
exports.acadmicFacultyServices = void 0;
const academicFaculty_model_1 = require("./academicFaculty.model");
const createAcademicFacultyIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.create(payload);
    return result;
});
// Get single semester
const getSingleAcademicFacultiesFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.findOne({ _id: id });
    return result;
});
// Get all semester
const getAllAcademicFacultiesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.find();
    return result;
});
// Update single semester
const updateSingleAcademicFacultyIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// Delete single semester
const deleteSingleAcademicFacultyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.deleteOne({ _id: id });
    return result;
});
exports.acadmicFacultyServices = {
    createAcademicFacultyIntoDb,
    getSingleAcademicFacultiesFromDB,
    updateSingleAcademicFacultyIntoDB,
    deleteSingleAcademicFacultyFromDB,
    getAllAcademicFacultiesFromDB,
};
