import React from 'react';
import authSelector from 'selectors/auth';
import redirect from 'services/redirect_service';
import { NextPage } from 'next';
import { setCurrentUser } from 'reducers/Authorize';
import { AuthToken, TOKEN_STORAGE_KEY } from 'services/auth_token';
import nextCookie from 'next-cookies';

export const PrivateRoute = (Component: NextPage) => {
  const Wrapper = pageProps => <Component {...pageProps} />;

  Wrapper.getInitialProps = async ctx => {
    const tokenInCookie = nextCookie(ctx)[TOKEN_STORAGE_KEY];

    const token = new AuthToken(tokenInCookie);

    if (token.isValid) {
      await ctx.store.dispatch(setCurrentUser(token.decodedToken));
    } else {
      await ctx.store.dispatch(setCurrentUser({}));
      redirect('/login?redirected=true', ctx);
    }

    const props = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return props;
  };

  return Wrapper;
};
