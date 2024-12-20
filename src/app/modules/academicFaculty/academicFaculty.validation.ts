import { z } from 'zod';

const CreateAcademicFacultySchemaValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be a string',
    }),
  }),
});
const UpdateAcademicFacultySchemaValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be a string',
    }),
  }),
});

export const AcademicFacultyValidation = {
  CreateAcademicFacultySchemaValidation,
  UpdateAcademicFacultySchemaValidation,
};
