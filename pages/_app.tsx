import 'styles/util.scss';
import 'styles/css/main.css';
import 'styles/slider-animating.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'styles/fonts/themify/themify-icons.css';
import 'react-animated-slider/build/horizontal.css';
import 'styles/fonts/elegant-font/html-css/style.css';
import 'styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import 'styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import React from 'react';
import App, { AppContext } from 'next/app';
import withRedux from 'next-redux-wrapper';
import Toasts from 'components/common/Toasts';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { initializeStore } from '../store';

interface Props {
  store: Store;
}

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Toasts />
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(initializeStore)(MyApp);
