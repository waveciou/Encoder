import '../scss/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/Component/app';

ReactDOM.render(
  <React.StrictMode>
    <div className="wrapper">
      <div className="wrap">
        <h1 className="title">TEXT ENCODER</h1>
        <p className="text-center">This is an encoder for string, it can be transform the text into code.</p>
        <App />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('app')
);