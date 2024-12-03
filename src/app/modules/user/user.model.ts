import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userModel = new Schema<IUser>(
  {
    id: { type: String, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    role: { type: String, enum: ['faculty', 'student', 'admin'] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userModel.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
  next();
});

userModel.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<IUser>('User', userModel);
