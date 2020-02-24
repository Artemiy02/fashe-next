import React, { FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute: FunctionComponent<any> = ({
  component: Component,
  authorize,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => authorize ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default PrivateRoute;
