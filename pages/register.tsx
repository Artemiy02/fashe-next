import authSelector from 'selectors/auth';
import errorsSelector from 'selectors/errors';
import Google from 'components/common/Google';
import React, { FunctionComponent } from 'react';
import Facebook from 'components/common/Facebook';
import FormTextField from 'components/common/FormTextField';
import { IUser } from 'types/Login';
import { registerUser } from 'actions/Authorize';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { validateRegisterForm, INewUser } from 'utils/Validations';

export type AllFormProps = IUser &
  InjectedFormProps<INewUser> &
  RouteComponentProps;

const RegisterForm: FunctionComponent<AllFormProps> = ({ handleSubmit }) => {
  const errors = useSelector(errorsSelector);
  const authorize = useSelector(authSelector);
  const dispatch = useDispatch();
  const onSubmit = (values: any) => {
    dispatch(registerUser(values));
  };
  return !authorize ? (
    <div className="wrapper">
      <div className="login_form">
        <div className="main_title">
          <h2>Register Page</h2>
        </div>
        <form className="contact_us_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-20">
            <Field
              name="name"
              component={FormTextField}
              type="text"
              className="form-control"
              label="Name"
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>
          <div className="form-group mb-20">
            <Field
              name="email"
              component={FormTextField}
              type="email"
              className="form-control"
              label="E-mail"
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>
          <div className="form-group">
            <Field
              name="password"
              component={FormTextField}
              type="password"
              className="form-control"
              label="Password"
            />
            {errors.password && (
              <span className="error-msg">{errors.password}</span>
            )}
          </div>
          <div className="form-group">
            <Field
              name="confirmPassword"
              component={FormTextField}
              type="password"
              className="form-control"
              label="Confirm Password"
            />
            {errors.confirmPassword && (
              <span className="error-msg">{errors.confirmPassword}</span>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn-sbmt">
              Register
            </button>
          </div>
          <div className="text-center p-t-20">
            <p>You also can using:</p>
            <div className="btn">
              <Facebook textButton="Register with Facebook" />
            </div>
            <div className="btn">
              <Google buttonText="Register with Google" />
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default reduxForm({
  form: 'loginForm',
  validate: validateRegisterForm
})(RegisterForm);
