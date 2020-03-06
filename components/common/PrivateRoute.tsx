import React from 'react';
import authSelector from 'selectors/auth';
import redirect from 'services/redirect_service';

export const PrivateRoute = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const Wrapper = (props) => <Component {...props} />;

  Wrapper.getInitialProps = async (ctx) => {
    const state = ctx.store.getState();
    const isAuth = authSelector(state);

    if (!isAuth) {
      redirect('/login?redirected=true', ctx);
    }
    return { store: ctx.store };
  };

  return Wrapper;
};
