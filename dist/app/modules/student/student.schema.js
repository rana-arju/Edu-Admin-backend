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
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
function capitalize(value) {
    return value
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required.'],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required.'],
    },
    middleName: {
        type: String,
        trim: true,
    },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        required: [true, "Father's name is required."],
        trim: true,
    },
    fatherOccupation: {
        type: String,
        required: [true, "Father's occupation is required."],
        trim: true,
    },
    fatherContactNo: {
        type: String,
    },
    motherName: {
        type: String,
        required: [true, "Mother's name is required."],
        trim: true,
    },
    motherOccupation: {
        type: String,
        required: [true, "Mother's occupation is required."],
        trim: true,
    },
    motherContact: {
        type: String,
    },
});
const localSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Local guardian's name is required."],
        trim: true,
    },
    occupation: {
        type: String,
        trim: true,
    },
    contactNo: {
        type: String,
    },
    address: {
        type: String,
        required: [true, "Local guardian's address is required."],
        trim: true,
    },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'Student ID is required.'],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User ID is required.'],
        unique: true,
        ref: 'User',
    },
    name: {
        type: userNameSchema,
        required: [true, 'Name field is required.'],
    },
    profileImg: String,
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Email address is required.'],
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: '{VALUE} is not valid email type.',
        },
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Gender is required.'],
    },
    dateOfBirth: {
        type: Date,
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required.'],
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency contact number is required.'],
    },
    blood: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        required: [true, 'Blood group is required.'],
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required.'],
        trim: true,
    },
    parmanentAddress: {
        type: String,
        required: [true, 'Permanent address is required.'],
        trim: true,
    },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian information is required.'],
    },
    localGuardian: {
        type: localSchema,
        required: [true, 'Local guardian information is required.'],
    },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { toJSON: { virtuals: true } });
// Virtual
studentSchema.virtual('fullName').get(function () {
    return `${this.name.firstName}  ${this.name.lastName}`;
});
/// middleware for name capitalize
userNameSchema.pre('save', function (next) {
    if (this.isModified('firstName') && this.firstName) {
        this.firstName = capitalize(this.firstName);
    }
    if (this.isModified('lastName') && this.lastName) {
        this.lastName = capitalize(this.lastName);
    }
    if (this.isModified('middleName') && this.middleName) {
        this.middleName = capitalize(this.middleName);
    }
    next();
});
// Query middleware
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('findOne', function (next) {
    this.findOne({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
// creating a custom method
studentSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Student.findOne({ id });
        return existingUser;
    });
};
// Create the model
exports.Student = (0, mongoose_1.model)('Student', studentSchema);
