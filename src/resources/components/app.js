import React, { Component } from 'react';

import LoadingComponent from './loading';

class App extends Component {

  state = {
    process: {
      digits: 5,
      prime: [],
      table: [],
      alphabet: [],
      tableKeyword: []
    },
    loading: {
      control: false,
      type: ''
    }
  };

  componentDidMount() {
    const process = require('../data/process.json');
    console.log(process);
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="main">
        <div className="select__control">
          <div className="select__fieldset">
            <input type="radio" name="select-control" id="encode" />
            <label htmlFor="encode" title="Encode">Encode<span></span></label>
          </div>
          <div className="select__fieldset">
            <input type="radio" name="select-control" id="decode" />
            <label htmlFor="decode" title="Decode">Decode<span></span></label>
          </div>
        </div>

        <div className="article">
          <label className="caption" htmlFor="input-area">Input :</label>
          <textarea id="input-area" className="textarea"></textarea>
        </div>

        <div className="row">
          <button className="btn" title="Submit">Submit</button>
          <button className="btn" title="Clear">Clear</button>
        </div>

        <div className="article">
          <label className="caption" htmlFor="output-area">Output :</label>
          <div id="output-area" className="textarea"></div>
        </div>

        { loading.control === true ? <LoadingComponent /> : null }
      </div>
    );
  }
}

export default App;