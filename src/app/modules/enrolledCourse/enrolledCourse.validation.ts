import { z } from 'zod';

const createEnrolledCourseSchemaValidation = z.object({
  body: z.object({
    offeredCourse: z.string({
      required_error: 'Offered course is required',
    }),
  }),
});

const updateEnrolledCourseSchemaValidation = z.object({
  body: z.object({
    courseMarks: z.object({
      classTest1: z.number().optional(),
      classTest2: z.number().optional(),
      midTerm: z.number().optional(),
      finalTerm: z.number().optional(),
    }),
    semesterRegistration: z.string(),
    offeredCourse: z.string(),
    student: z.string(),
  }),
});

export const enrolledCourseValidation = {
  createEnrolledCourseSchemaValidation,
  updateEnrolledCourseSchemaValidation,
};
