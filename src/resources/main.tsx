import './scss/main.scss';
import './img/demo.gif';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/Component/app';

ReactDOM.render(
  <React.StrictMode>
    <div className="tw-pt-4 tw-pb-8">
      <div className="tw-w-full tw-m-auto tw-max-w-[calc(100%-30px)] tablet-lg:tw-max-w-[768px]">
        <h1 className="tw-mt-4 tw-mb-6 tw-text-title tablet:tw-text-title-lg tw-text-white tw-text-center tw-leading-[1.6em] before:tw-content-[''] before:tw-w-[1.6em] before:tw-h-[1.6em] before:tw-mr-4 before:tw-inline-block before:tw-align-top before:tw-box-border before:tw-border-4 before:tw-border-white before:tw-border-solid before:tw-rounded-lg before:tw-bg-[url('../img/icon.svg')] before:tw-bg-no-repeat before:tw-bg-center before:tw-bg-70%">
          TEXT ENCODER
        </h1>
        <p className="tw-text-center tw-mb-4">
          This is an encoder for string, it can be transform the text into code.
        </p>
        <App />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('app')
);
