import { z } from 'zod';
const preRequisiteCourses = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional()
});
const CreateCourseSchemaValidation = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'Course must be a string',
      required_error: 'Course is required',
    }),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(preRequisiteCourses).optional(),
  }),
});
const UpdateCoursetSchemaValidation = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'Course must be a string',
      required_error: 'Course is required',
    }),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(preRequisiteCourses).optional(),
  }),
});

export const courseValidation = {
  CreateCourseSchemaValidation,
  UpdateCoursetSchemaValidation,
};
