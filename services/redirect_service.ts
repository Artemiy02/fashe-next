import Router from 'next/router';
import { setInitialPath } from 'reducers/initialPath';

export default async (target, ctx) => {
  const prevPath = ctx.asPath;
  await ctx.store.dispatch(setInitialPath(prevPath));

  if (ctx.res) {
    // If on the server, an HTTP 303 response with a "Location"
    // is used to redirect.
    ctx.res.writeHead(302, { Location: target });
    ctx.res.end();
  } else {
    // On the browser, next/router is used to "replace" the current
    // location for the new one, removing it from history.
    Router.push(target);
  }
};
