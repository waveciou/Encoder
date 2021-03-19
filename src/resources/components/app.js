import React, { Component } from 'react';

import LoadingComponent from './loading';
import SelectControlComponent from './selectControl';
import InputArticleComponent from './inputArticle';
import OutputArticleComponent from './outputArticle';

class App extends Component {

  state = {
    textInput: '',
    textOutput: '',
    encode_selected: true,
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

  // * 更新輸入明文
  updateTextInput = (payload) => {
    this.setState({
      textInput: payload
    });
  };

  // * 編解碼選擇（Radio Button）
  setEncodeSelected = (payload) => {
    this.setState({
      encode_selected: payload
    });
  };

  // * 清除 Input 和 Output 的內容
  clearHandler = (e) => {
    this.setState({
      textInput: '',
      textOutput: ''
    });
    e.stopPropagation();
  };

  render() {
    const { textInput, textOutput, encode_selected, loading } = this.state;

    return (
      <div className="main">
        <SelectControlComponent setEncodeSelected={ this.setEncodeSelected } encode_selected={ encode_selected } />

        <InputArticleComponent textInput={ textInput } updateTextInput={ this.updateTextInput } />

        <div className="row">
          <button className="btn" title="Submit">Submit</button>
          <button className="btn" title="Clear" onClick={ this.clearHandler }>Clear</button>
        </div>

        <OutputArticleComponent textOutput={ textOutput } />

        { loading.control === true ? <LoadingComponent /> : null }
      </div>
    );
  }
}

export default App;