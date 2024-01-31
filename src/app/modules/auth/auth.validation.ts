/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

const passwordSchema = z.string().refine(
  (password) => {
    const errors = [];
    if (!/\d/.test(password))
      errors.push('At least one number digit is required.');
    if (!/[A-Z]/.test(password))
      errors.push('At least one uppercase letter is required.');
    if (!/[a-z]/.test(password))
      errors.push('At least one lowercase letter is required.');
    if (!/[^a-zA-Z0-9]/.test(password))
      errors.push('At least one symbol is required.');
    if (password.length < 8)
      errors.push('Password must be at least 8 characters long.');
    if (/\s/.test(password)) {
      const spacePositions = password
        .split('')
        .reduce(
          (acc: any, char, index) => (char === ' ' ? [...acc, index] : acc),
          [],
        );
      errors.push(
        `Password must not contain spaces. Space positions: ${spacePositions.join(
          ', ',
        )}`,
      );
    }

    if (errors.length > 0) {
      throw new Error(errors.join(' '));
    }

    return true;
  },
  { message: 'Invalid password format.' },
);

const regValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'User name is required.' }),
    password: passwordSchema,
  }), 
});

const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'User name is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});


export const AuthValidation = {
  regValidationSchema,
  loginValidationSchema
};
