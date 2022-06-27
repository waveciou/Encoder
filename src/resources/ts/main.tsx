import '../scss/main.scss';
import '../img/demo.gif';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/Component/app';

ReactDOM.render(
  <React.StrictMode>
    <div className="tw-pt-4 tw-pb-8">
      <div className="tw-w-full tw-m-auto tw-max-w-[calc(100%-30px)] tablet-lg:tw-max-w-[768px]">
        <h1 className="title">TEXT ENCODER</h1>
        <p className="tw-text-center tw-mb-4">
          This is an encoder for string, it can be transform the text into code.
        </p>
        <App />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('app')
);
