import React, { Component } from 'react';

// * Component
import LoadingComponent from './loading';
import SelectControlComponent from './selectControl';
import InputArticleComponent from './inputArticle';
import OutputArticleComponent from './outputArticle';

// * Function
import setDefaultParam from '../js/function/setDefaultParam';
import getRandomNumber from '../js/function/getRandomNumber';
import encodeHandler from '../js/function/encodeHandler';
import replaceHandler from '../js/function/replaceHandler';
import decodeHandler from '../js/function/decodeHandler';
import reductionHandler from '../js/function/reductionHandler';

class App extends Component {

  state = {
    textInput: '',
    textOutput: '',
    encode_selected: true,
    parameter: {
      digits: 5,
      prime: [],
      table: [],
      alphabet: [],
      tableKeyword: []
    },
    loading: {
      control: true,
      type: ''
    }
  };

  componentDidMount() {
    const { parameter } = this.state;
    const data = require('../data/parameter.json');
    const _param = setDefaultParam(data, parameter);

    this.setState(() => ({
      parameter: _param,
      loading: {
        control: false,
        type: ''
      }
    }));
  }

  // * 更新輸入明文
  updateTextInput = (payload) => {
    this.setState({
      textInput: payload
    });
  };

  // * 編解碼選擇（Radio Button）
  setEncodeSelected = (payload) => {
    this.clearHandler();

    this.setState({
      encode_selected: payload
    });
  };

  // * 清除 Input 和 Output 的內容
  clearHandler = () => {
    this.setState({
      textInput: '',
      textOutput: ''
    });
  };

  // * 送出內容（編碼或解碼）
  submitHandler = () => {
    const { textInput, encode_selected } = this.state;

    if (textInput && typeof textInput === 'string') {
      const result = this.computedCode(encode_selected);

      this.setState(() => ({
        textOutput: result,
        loading: {
          control: false,
          type: ''
        }
      }));
    }

    return false;
  };

  // * 判斷目前是編碼或解碼，並回傳對應的編解碼值
  computedCode = (encodeSelected) => {
    const { textInput, parameter } = this.state;

    this.setState(() => ({
      loading: {
        control: true,
        type: encodeSelected === true ? 'encode' : 'decode'
      }
    }));

    if (encodeSelected === true) {
      // 編碼
      const code = encodeHandler(textInput, parameter);
      const tableKey = getRandomNumber(0, parameter.tableKeyword.length);
      return replaceHandler(code, tableKey, parameter);
    } else {
      // 解碼
      const code = reductionHandler(textInput, parameter);
      return decodeHandler(code, parameter);
    }
  };

  render() {
    const { textInput, textOutput, encode_selected, loading } = this.state;

    return (
      <div className="main">
        <SelectControlComponent setEncodeSelected={ this.setEncodeSelected } encode_selected={ encode_selected } />

        <InputArticleComponent textInput={ textInput } updateTextInput={ this.updateTextInput } />

        <div className="row">
          <button className="btn" title="Submit" onClick={ this.submitHandler }>Submit</button>
          <button className="btn" title="Clear" onClick={ this.clearHandler }>Clear</button>
        </div>

        <OutputArticleComponent textOutput={ textOutput } />

        { loading.control === true ? <LoadingComponent type={ loading.type } /> : null }
      </div>
    );
  }
}

export default App;