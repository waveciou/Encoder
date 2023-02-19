import React from 'react';

import LoaderHeading from '@/Function/loaderHeading';

const loading = ({ type }: { type: string }) => (
  <div className="w-full h-full flex items-center justify-center fixed top-0 left-0 z-1000 bg-black/[0.8]">
    <div>
      <div className="flex justify-center">
        <div className="bouncing-loader-item" />
        <div className="bouncing-loader-item" />
        <div className="bouncing-loader-item" />
      </div>
      <div className="text-center text-white">{LoaderHeading(type)}</div>
    </div>
  </div>
);

export default loading;
