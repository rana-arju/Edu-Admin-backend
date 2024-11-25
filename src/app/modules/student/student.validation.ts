import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    'string.empty': 'First name is required.',
    'any.required': 'First name is required.',
  }),
  lastName: Joi.string().trim().required().messages({
    'string.empty': 'Last name is required.',
    'any.required': 'Last name is required.',
  }),
  middleName: Joi.string().trim().optional(),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.empty': "Father's name is required.",
    'any.required': "Father's name is required.",
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.empty': "Father's occupation is required.",
    'any.required': "Father's occupation is required.",
  }),
  fatherContactNo: Joi.string().optional(),
  motherName: Joi.string().trim().required().messages({
    'string.empty': "Mother's name is required.",
    'any.required': "Mother's name is required.",
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.empty': "Mother's occupation is required.",
    'any.required': "Mother's occupation is required.",
  }),
  motherContact: Joi.string().optional(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': "Local guardian's name is required.",
    'any.required': "Local guardian's name is required.",
  }),
  occupation: Joi.string().optional(),
  contactNo: Joi.string().optional(),
  address: Joi.string().trim().required().messages({
    'string.empty': "Local guardian's address is required.",
    'any.required': "Local guardian's address is required.",
  }),
});
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required.',
    'any.required': 'Student ID is required.',
  }),
  password: Joi.string().min(8).required().label('Password'),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Name field is required.',
  }),
  profileImg: Joi.string().uri().optional(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email address must be valid.',
    'string.empty': 'Email address is required.',
    'any.required': 'Email address is required.',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Gender must be one of [male, female, other].',
    'any.required': 'Gender is required.',
  }),
  dateOfBirth: Joi.string().isoDate().optional(),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact number is required.',
    'any.required': 'Contact number is required.',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'Emergency contact number is required.',
    'any.required': 'Emergency contact number is required.',
  }),
  blood: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
    .required()
    .messages({
      'any.only':
        'Blood group must be one of [A+, A-, B+, B-, O+, O-, AB+, AB-].',
      'any.required': 'Blood group is required.',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Present address is required.',
    'any.required': 'Present address is required.',
  }),
  parmanentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Permanent address is required.',
    'any.required': 'Permanent address is required.',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required.',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local guardian information is required.',
  }),
  isActive: Joi.string()
    .valid('active', 'inactive')
    .default('active')
    .messages({
      'any.only': 'isActive must be one of [active, inactive].',
    }),
  isDeleted: Joi.boolean(),
});


export default studentValidationSchema;