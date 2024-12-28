import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import validator from 'validator';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, unique: true },
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
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangeTime: { type: Date },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    role: {
      type: String,
      enum: ['faculty', 'student', 'admin', 'superAdmin'],
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};
userSchema.statics.isPasswordMatched = async function (
  plainTextpassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainTextpassword, hashPassword);
};
userSchema.statics.isJWTIssuedBeforePasswordChange = async function (
  passwordChange: Date,
  jwtIssuesTimeStamp: number,
) {
  const passwordChangeTime = new Date(passwordChange).getTime() / 1000;
  //console.log(passwordChangeTime > jwtIssuesTimeStamp);

  return passwordChangeTime > jwtIssuesTimeStamp;
};

export const User = model<IUser, UserModel>('User', userSchema);
