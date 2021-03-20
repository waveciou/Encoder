import React from 'react';
import LoadingTextHandler from '../js/function/loadingTextHandler';

const loading = (props) => {
  return (
    <div className="loading">
      <div>
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loading-text">{ LoadingTextHandler(props.type) }</div>
      </div>
    </div>
  );
};

export default loading;