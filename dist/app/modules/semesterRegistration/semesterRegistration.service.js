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
exports.semesterRegistrationServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const semesterRegistration_model_1 = require("./semesterRegistration.model");
const offeredCourse_model_1 = require("../offeredCourse/offeredCourse.model");
const createSemesterRegistrationIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check any semester upcomming or ongoining
    const isSemesterUpcomingOrOngoing = yield semesterRegistration_model_1.SemesterRegistration.findOne({
        $or: [
            {
                status: semesterRegistration_constant_1.RegistrationStatus.UPCOMING,
            },
            {
                status: semesterRegistration_constant_1.RegistrationStatus.ONGOING,
            },
        ],
    });
    if (isSemesterUpcomingOrOngoing) {
        throw new AppError_1.default(400, `There is a already ${isSemesterUpcomingOrOngoing.status} registered semester!`);
    }
    // check semester exist or not
    const existSemester = yield academicSemester_model_1.AcademicSemester.findById(payload === null || payload === void 0 ? void 0 : payload.academicSemester);
    if (!existSemester) {
        throw new AppError_1.default(404, 'This academic smester is not found!');
    }
    // check semester registration or not
    const isExistSemesterRegistration = yield semesterRegistration_model_1.SemesterRegistration.findOne({
        academicSemester: payload === null || payload === void 0 ? void 0 : payload.academicSemester,
    });
    if (isExistSemesterRegistration) {
        throw new AppError_1.default(409, 'This academic smester is already registration!');
    }
    const result = yield semesterRegistration_model_1.SemesterRegistration.create(payload);
    return result;
});
// Get single semester
const getSingleRegisteredSemesterFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_model_1.SemesterRegistration.findById(id).populate('academicSemester');
    return result;
});
// Get all semester
const getAllRegisteredSemesterFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const registeredSemesterQuery = new QueryBuilder_1.default(semesterRegistration_model_1.SemesterRegistration.find().populate('academicSemester'), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield registeredSemesterQuery.modelQuery;
    const meta = yield registeredSemesterQuery.countTotal();
    return { result, meta };
});
// Update single semester
const updateSingleRegisterSemestertIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isRegisterdSemesterExist = yield semesterRegistration_model_1.SemesterRegistration.findById(id);
    if (!isRegisterdSemesterExist) {
        throw new AppError_1.default(404, 'This register semester not found!');
    }
    // if the requested semester is ended, we will not update anything
    if ((isRegisterdSemesterExist === null || isRegisterdSemesterExist === void 0 ? void 0 : isRegisterdSemesterExist.status) === semesterRegistration_constant_1.RegistrationStatus.ENDED) {
        throw new AppError_1.default(400, 'This semester is already Ended!');
    }
    if ((isRegisterdSemesterExist === null || isRegisterdSemesterExist === void 0 ? void 0 : isRegisterdSemesterExist.status) === semesterRegistration_constant_1.RegistrationStatus.UPCOMING &&
        (payload === null || payload === void 0 ? void 0 : payload.status) === semesterRegistration_constant_1.RegistrationStatus.ENDED) {
        throw new AppError_1.default(400, 'you can not directly change status UPCOMING to ENDED!');
    }
    if ((isRegisterdSemesterExist === null || isRegisterdSemesterExist === void 0 ? void 0 : isRegisterdSemesterExist.status) === semesterRegistration_constant_1.RegistrationStatus.ONGOING &&
        (payload === null || payload === void 0 ? void 0 : payload.status) === semesterRegistration_constant_1.RegistrationStatus.UPCOMING) {
        throw new AppError_1.default(400, 'you can not reverse status ONGOING to UPCOMING!');
    }
    const result = yield semesterRegistration_model_1.SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete Semester Registration
const deleteSemesterRegistrationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    /**
    * Step1: Delete associated offered courses.
    * Step2: Delete semester registraton when the status is
    'UPCOMING'.
    **/
    // checking if the semester registration is exist
    const isSemesterRegistrationExists = yield semesterRegistration_model_1.SemesterRegistration.findById(id);
    if (!isSemesterRegistrationExists) {
        throw new AppError_1.default(404, 'This registered semester is not found !');
    }
    // checking if the status is still "UPCOMING"
    const semesterRegistrationStatus = isSemesterRegistrationExists.status;
    if (semesterRegistrationStatus !== 'UPCOMING') {
        throw new AppError_1.default(400, `You can not update as the registered semester is ${semesterRegistrationStatus}`);
    }
    const session = yield mongoose_1.default.startSession();
    //deleting associated offered courses
    try {
        session.startTransaction();
        const deletedOfferedCourse = yield offeredCourse_model_1.OfferedCourse.deleteMany({
            semesterRegistration: id,
        }, {
            session,
        });
        if (!deletedOfferedCourse) {
            throw new AppError_1.default(400, 'Failed to delete semester registration !');
        }
        const deletedSemisterRegistration = yield semesterRegistration_model_1.SemesterRegistration.findByIdAndDelete(id, {
            session,
            new: true,
        });
        if (!deletedSemisterRegistration) {
            throw new AppError_1.default(400, 'Failed to delete semester registration !');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return null;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
exports.semesterRegistrationServices = {
    createSemesterRegistrationIntoDb,
    getSingleRegisteredSemesterFromDB,
    updateSingleRegisterSemestertIntoDB,
    getAllRegisteredSemesterFromDB,
    deleteSemesterRegistrationFromDB,
};
