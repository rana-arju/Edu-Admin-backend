import { z } from 'zod';

const userSchemaValidation = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, 'Password can not be 20 characters')
    .optional(),
});
const userStatusChangeValidation = z.object({
  body: z.object({
    status: z.enum(['in-progress', 'blocked']),
  }),
});

export const userValidation = {
  userStatusChangeValidation,
  userSchemaValidation,
};
