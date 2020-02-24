import React, { FunctionComponent } from 'react';
import { WrappedFieldsProps } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

interface IRenderFieldOwnProps {
  label: string;
  type: string;
}

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
}));

const FormTextField: FunctionComponent<WrappedFieldsProps & IRenderFieldOwnProps> = ({
  input,
  type,
  label,
  meta: { touched, error }
}) => {
  const classes = useStyles('textField');

  return (
    <div>
      <TextField
        type={type}
        error={touched && !!error}
        id={`form-input-${input.name}`}
        label={label}
        className={classes.textField}
        {...input}
      />
      {touched && (error && <span className="error-msg">{error}</span>)}
    </div>
  );
};

export default FormTextField;
