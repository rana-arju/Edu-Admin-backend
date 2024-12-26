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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_schema_1 = require("./student.schema");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const student_constant_1 = require("./student.constant");
const getAllStudentFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    let searchTerm = '';
   
    if (query?.searchTerm) {
      searchTerm = query.searchTerm as string;
    }
  
    const objectQuery = { ...query };
  
    const excludeField = ['searchTerm', 'sort', 'limit',"page", "fields"];
    excludeField.forEach((el) => delete objectQuery[el]);
  
    const searchQuery = Student.find({
      $or: studentSearchableField.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  
    const filterQuery = searchQuery
      .find(objectQuery)
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      });
  
    let sort = '-createdAt';
    if (query?.sort) {
      sort = query.sort as string;
    }
    const sortQuery = filterQuery.sort(sort);
    let page = 1;
    let skip = 0;
    let limit = 10;
  
    if (query?.limit) {
      limit = Number(query.limit);
    }
    if (query?.page) {
      page = Number(query.page);
      skip = (page - 1) * limit;
    }
  
    const paginateQuery = sortQuery.skip(skip);
    const limitQuery = paginateQuery.limit(limit);
  
    // fields limiting
    let fields = '__v';
    if (query?.fields) {
      fields = (query.fields as string).split(',').join(' ');
    }
    const fieldsQuery = await limitQuery.select(fields);
  
    return fieldsQuery;
    */
    const studentQuery = new QueryBuilder_1.default(student_schema_1.Student.find()
        .populate('user')
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    }), query)
        .search(student_constant_1.studentSearchableField)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield studentQuery.modelQuery;
    const meta = yield studentQuery.countTotal();
    return { result, meta };
});
const getStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_schema_1.Student.findById(id)
        .populate('user')
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    });
    return result;
});
const updateStudentFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = payload, remainingStudentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifiedUpdatedData = Object.assign({}, remainingStudentData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }
    const result = yield student_schema_1.Student.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedStudent = yield student_schema_1.Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedStudent) {
            throw new AppError_1.default(400, 'Failed to delete student!');
        }
        const deletedUser = yield user_model_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppError_1.default(400, 'Failed to delete user!');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        // throw new Error('Failed to delete student');
        throw error;
    }
});
exports.StudentServices = {
    getAllStudentFromDB,
    getStudentFromDB,
    deleteStudentFromDB,
    updateStudentFromDB,
};
