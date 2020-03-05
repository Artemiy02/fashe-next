import React from 'react';
import Router from 'next/router';
import authSelector from 'selectors/auth';
import { useSelector } from 'react-redux';
import { NextPageContext } from 'next';

export const PrivateRoute = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const Wrapper = (props) => {
    const auth = useSelector(authSelector);

    return <Component {...props} />;
  };

  Wrapper.getInitialProps = (ctx: NextPageContext) => {
    console.log('+++++++++++++++++++++++');
    console.log('ctx -----', ctx);
    console.log('ctx headers===========', ctx.req.headers);
    console.log('c++++++++++++++++++++++');

    // create AuthToken
    const auth = AuthToken.fromNext(ctx);
    const initialProps = { auth };
    // if the token is expired, that means the user is no longer (or never was) authenticated
    // and if we allow the request to continue, they will reach a page they should not be at.
    if (auth.isExpired)
      console.log(
        'hey! server says you shouldnt be here! you are not logged in!'
      );
    if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps(initialProps);
      // make sure our `auth: AuthToken` is always returned
      return { ...wrappedProps, auth };
    }
    return {};
  };

  return Wrapper;
};
