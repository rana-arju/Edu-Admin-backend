import { z } from 'zod';
const preRequisiteCourses = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
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
    title: z
      .string({
        invalid_type_error: 'Course must be a string',
        required_error: 'Course is required',
      })
      .optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(preRequisiteCourses).optional(),
  }),
});

const facultyWithCourseValidation = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const courseValidation = {
  CreateCourseSchemaValidation,
  UpdateCoursetSchemaValidation,
  facultyWithCourseValidation,
};
