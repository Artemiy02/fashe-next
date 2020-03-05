import Google from 'components/common/Google';
import React, { FunctionComponent } from 'react';
import Facebook from 'components/common/Facebook';
import FormTextField from 'components/common/FormTextField';
import { IUser } from 'types/Login';
import { useDispatch } from 'react-redux';
import { loginUser } from 'actions/Authorize';
import { validateLoginForm } from 'utils/Validations';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

export interface ILoginFormProps {
  authorize: boolean;
  loginUser?: (c: IUser) => void;
}

export type AllFormProps = IUser & InjectedFormProps<IUser> & ILoginFormProps;

const LoginForm: FunctionComponent<AllFormProps> = ({ handleSubmit }) => {
  const dispatch = useDispatch();

  const onSubmit = (values: any) => {
    dispatch(loginUser(values));
  };

  return (
    <div className="wrapper">
      <div className="login_form">
        <div className="main_title">
          <h2>Login Page</h2>
        </div>
        <form className="contact_us_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-20">
            <Field
              name="email"
              component={FormTextField}
              type="email"
              className="form-control"
              label="E-mail"
            />
          </div>
          <div className="form-group">
            <Field
              name="password"
              component={FormTextField}
              type="password"
              className="form-control"
              label="Password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn-sbmt">
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="text-center p-t-20">
        <p>You also can using:</p>
        <div className="btn">
          <Facebook textButton="Login with Facebook" />
        </div>
        <div className="btn">
          <Google buttonText="Login with Google" />
        </div>
      </div>
    </div>
  );
};

// export default LoginForm as ComponentType<InjectedFormProps<IUser, {}, string>>;

export default reduxForm({
  form: 'loginForm',
  validate: validateLoginForm
})(LoginForm);
