import Validator from 'validator';
import { IUser } from 'types/Login';
import { IErrors } from 'reducers/Errors';

export interface INewUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateLoginForm = (values: IUser) => {
  const errors: IErrors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more';
  }
  return errors;
};

export const validateRegisterForm = (values: INewUser) => {
  const errors: IErrors = {};
  if (!values.password) values.password = '';

  if (values.name && !Validator.isLength(values.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (!values.name) {
    errors.name = 'Name field is required';
  }

  if (!values.email) {
    errors.email = 'Email field is required';
  }

  if (values.email && !Validator.isEmail(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.password) {
    errors.password = 'Password field is required';
  }

  if (values.password && !Validator.isLength(values.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password field is required';
  }

  if (values.confirmPassword && !Validator.equals(values.password, values.confirmPassword)) {
    errors.confirmPassword = 'Password must match';
  }

  return errors;
};
