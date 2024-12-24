import { z } from 'zod';

const createEnrolledCourseSchemaValidation = z.object({
  body: z.object({
    offeredCourse: z.string({
      required_error: 'Offered course is required',
    }),
  }),
});

export const enrolledCourseValidation = {
  createEnrolledCourseSchemaValidation,
};
