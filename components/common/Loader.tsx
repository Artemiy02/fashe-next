import React from 'react';
import Loader from 'styles/icons/loader.gif';

export default () => {
  return (
    <div
      style={{
        height: '570px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
      <img
        src={Loader}
        style={{
          margin: 'auto',
          display: 'block'
        }}
        alt="Loading..."
      />
    </div>
  );
};
