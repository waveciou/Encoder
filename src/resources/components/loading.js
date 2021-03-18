import React from 'react';

const loading = () => {
  return (
    <div className="loading">
      <div>
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loading-text"></div>
      </div>
    </div>
  );
};

export default loading;