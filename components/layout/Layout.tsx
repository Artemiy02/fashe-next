import React, { FunctionComponent } from 'react';

import Header from './Header/Header';
import Footer from './Footer';

const Layout: FunctionComponent = ({ children }) => (
  <>
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </>
);

export default Layout;
