import { z } from 'zod';
import { Days } from './offeredCourse.constant';
const timeStringSchema = z.string().refine(
  (time) => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  },
  { message: "Invalid time format. Expected 'HH:MM' in 24 hours format" },
);
const createOfferedCourseSchemaValidation = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`2000-03-18T${body.startTime}:00`);
        const end = new Date(`2000-03-18T${body.endTime}:00`);
        return end > start;
      },
      { message: 'Start time should be before End time!' },
    ),
});
const updateOfferedCourseSchemaValidation = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`2000-03-18T${body.startTime}:00`);
        const end = new Date(`2000-03-18T${body.endTime}:00`);
        return end > start;
      },
      { message: 'Start time should be before End time!' },
    ),
});

export const offeredCourseValidation = {
  createOfferedCourseSchemaValidation,
  updateOfferedCourseSchemaValidation,
};
