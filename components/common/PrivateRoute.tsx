import React from 'react';
import authSelector from 'selectors/auth';
import redirect from 'services/redirect_service';
import { NextPage } from 'next';

export const PrivateRoute = (Component: NextPage) => {
  const Wrapper = (pageProps) => <Component {...pageProps} />;

  Wrapper.getInitialProps = async (ctx) => {
    const state = ctx.store.getState();
    const isAuth = authSelector(state);

    if (!isAuth) {
      redirect('/login?redirected=true', ctx);
    }
    const props = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return props;
  };

  return Wrapper;
};
