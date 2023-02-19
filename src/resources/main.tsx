import './scss/main.scss';
import './img/demo.gif';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/Component/app';

ReactDOM.render(
  <React.StrictMode>
    <div className="pt-4 pb-8">
      <div className="w-full m-auto max-w-[calc(100%-30px)] tablet-lg:max-w-[768px]">
        <h1 className="mt-4 mb-6 text-title tablet:text-title-lg text-white text-center leading-[1.6em] before:content-[''] before:w-[1.6em] before:h-[1.6em] before:mr-4 before:inline-block before:align-top before:box-border before:border-4 before:border-white before:border-solid before:rounded-lg before:bg-[url('../img/icon.svg')] before:bg-no-repeat before:bg-center before:bg-70%">
          TEXT ENCODER
        </h1>
        <p className="text-center mb-4">
          This is an encoder for string, it can be transform the text into code.
        </p>
        <App />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('app')
);
