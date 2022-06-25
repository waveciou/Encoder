import React from 'react';

import LoaderHeading from '@/Function/loaderHeading';

const loading = ({ type }: { type: string }) => (
  <div className="loading">
    <div>
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="loading-text">{LoaderHeading(type)}</div>
    </div>
  </div>
);

export default loading;
