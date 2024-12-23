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
exports.acadmicDepartmentServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const academicDepartment_constant_1 = require("./academicDepartment.constant");
const academicDepartment_model_1 = require("./academicDepartment.model");
const createAcademicDepartmentIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.create(payload);
    return result;
});
// Get single semester
const getSingleAcademicDepartmentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.findById(id).populate('academicFaculty');
    return result;
});
// Get all semester
const getAllAcademicDepartmentFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartmentQuery = new QueryBuilder_1.default(academicDepartment_model_1.AcademicDepartment.find().populate('academicFaculty'), query)
        .search(academicDepartment_constant_1.academicDepartmentSearchableField)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield academicDepartmentQuery.modelQuery;
    return result;
});
// Update single semester
const updateSingleAcademicDepartmentIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// Delete single semester
const deleteSingleAcademicDepartmentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.deleteOne({ _id: id });
    return result;
});
exports.acadmicDepartmentServices = {
    createAcademicDepartmentIntoDb,
    getSingleAcademicDepartmentFromDB,
    updateSingleAcademicDepartmentIntoDB,
    deleteSingleAcademicDepartmentFromDB,
    getAllAcademicDepartmentFromDB,
};
