import React, { FunctionComponent } from 'react';
import img404 from 'styles/icons/error-404.png';

const NotFound: FunctionComponent = () => (
  <div className="not-found">
    <img src={img404} alt="404" />
  </div>
);

export default NotFound;
