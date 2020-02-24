import { reduxForm } from 'redux-form';
import { validateLoginForm } from 'utils/Validations';
import LoginForm from './Login';

export default reduxForm({
  form: 'loginForm',
  validate: validateLoginForm
})(LoginForm);
