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
exports.courseServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.create(payload);
    return result;
});
// Get single semester
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id).populate('preRequisiteCourses.course');
    return result;
});
// Get course faculty information
const getCourseFacultyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findOne({ course: id }).populate('faculties');
    return result;
});
// Get all semester
const getAllCourseFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Course.find().populate('preRequisiteCourses.course'), query)
        .search(course_constant_1.courseSearchableField)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield courseQuery.modelQuery;
    const meta = yield courseQuery.countTotal();
    return { result, meta };
});
// Update single semester
const updateSingleCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { preRequisiteCourses } = payload, courseRemainingData = __rest(payload, ["preRequisiteCourses"]);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // step: 1 basic course info update
        const updateBasicCourseInfo = yield course_model_1.Course.findByIdAndUpdate(id, courseRemainingData, {
            new: true,
            runValidators: true,
            session,
        });
        if (!updateBasicCourseInfo) {
            throw new AppError_1.default(400, 'Failed to update course!');
        }
        // check if there is any pre requisite courses to update
        if (preRequisiteCourses && (preRequisiteCourses === null || preRequisiteCourses === void 0 ? void 0 : preRequisiteCourses.length) > 0) {
            // filterout deleted fields
            const deletedPreRequisites = preRequisiteCourses
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);
            const deletePreRequisiteCourses = yield course_model_1.Course.findByIdAndUpdate(id, {
                $pull: {
                    preRequisiteCourses: { course: { $in: deletedPreRequisites } },
                },
            }, { new: true, runValidators: true, session });
            if (!deletePreRequisiteCourses) {
                throw new AppError_1.default(400, 'Failed to update course!');
            }
            // filter out the new course fields
            const newPreRequisites = preRequisiteCourses === null || preRequisiteCourses === void 0 ? void 0 : preRequisiteCourses.filter((el) => el.course && el.isDeleted == false);
            const newPreRequisiteCouresesAdd = yield course_model_1.Course.findByIdAndUpdate(id, {
                $addToSet: {
                    preRequisiteCourses: { $each: newPreRequisites },
                },
            }, { new: true, runValidators: true, session });
            if (!newPreRequisiteCouresesAdd) {
                throw new AppError_1.default(400, 'Failed to update course!');
            }
        }
        const result = yield course_model_1.Course.findById(id).populate('preRequisiteCourses.course');
        session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        session.abortTransaction();
        session.endSession();
        throw error;
    }
});
// Delete single semester
const deleteSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
// Delete single semester
const facultiesAssignIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, { course: id, $addToSet: { faculties: { $each: payload } } }, { upsert: true, new: true });
    return result;
});
const facultyRemoveFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, { $pull: { faculties: { $in: payload } } }, { new: true });
    return result;
});
exports.courseServices = {
    createCourseIntoDb,
    getSingleCourseFromDB,
    updateSingleCourseIntoDB,
    deleteSingleCourseFromDB,
    getAllCourseFromDB,
    facultiesAssignIntoDB,
    facultyRemoveFromDB,
    getCourseFacultyFromDB,
};
