import { z } from 'zod';

const loginSchemaValidation = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Id is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const changePasswordSchemaValidation = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({
      required_error: 'New Password is required',
    }),
  }),
});

export const authValidation = {
   loginSchemaValidation,
  changePasswordSchemaValidation
}
