import * as yup from 'yup'

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required()

export const signupSchema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  })
  .required()
