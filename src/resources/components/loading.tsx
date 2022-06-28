import React from 'react';

import LoaderHeading from '@/Function/loaderHeading';

const loading = ({ type }: { type: string }) => (
  <div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-fixed tw-top-0 tw-left-0 tw-z-1000 tw-bg-black/[0.8]">
    <div>
      <div className="bouncing-loader tw-flex tw-justify-center">
        <div />
        <div />
        <div />
      </div>
      <div className="tw-text-center tw-text-white">{LoaderHeading(type)}</div>
    </div>
  </div>
);

export default loading;
