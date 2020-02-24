import App from 'next/app';
import React from 'react';
import { withReduxStore } from 'services/withReduxStore';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import 'react-animated-slider/build/horizontal.css';
import 'styles/slider-animating.css';

interface IMyAppProps {
  reduxStore: Store;
}

class MyApp extends App<IMyAppProps> {
  constructor(props) {
    super(props);
  }
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
