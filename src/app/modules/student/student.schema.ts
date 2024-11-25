import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TGuardian,
  TStudent,
  TLocalGuardian,
  TUserName,
  StudentModel,
} from './student.interface';
import validator from 'validator';
import config from '../../config';

function capitalize(value: string): string {
  return value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const userNameSchema = new Schema<TUserName>({
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

const guardianSchema = new Schema<TGuardian>({
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

const localSchema = new Schema<TLocalGuardian>({
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

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required.'],
    },
    password: String,
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
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid email type.',
      },
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is required.'],
    },
    dateOfBirth: {
      type: String,
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
    isActive: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true } },
);

// Virtual

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName}  ${this.name.lastName}`
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

studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
  next();
});

studentSchema.post('save', function (doc, next) {
  doc.password = '';

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

// creating a custom instance method

/* studentSchema.methods.isUserExists = async function (id:string) {
  const existingUser = await Student.findOne({id})
  return existingUser
  
}
  */
// creating a custom method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// Create the model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
