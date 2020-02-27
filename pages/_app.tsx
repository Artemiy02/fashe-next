import 'styles/slider-animating.css';
import 'react-animated-slider/build/horizontal.css';
import React from 'react';
import App from 'next/app';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { withReduxStore } from 'services/withReduxStore';

interface IMyAppProps {
  reduxStore: Store;
}

class MyApp extends App<IMyAppProps> {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default withReduxStore(MyApp);
