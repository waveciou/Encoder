import React from 'react';

import LoadingTextProvider from '@/Functions/loadingTextProvider';

const loading = ({ type }: { type: string }) => (
  <div className="loading">
    <div>
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="loading-text">{ LoadingTextProvider(type) }</div>
    </div>
  </div>
);

export default loading;