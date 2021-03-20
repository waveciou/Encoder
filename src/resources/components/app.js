import React, { Component } from 'react';

// * Component
import LoadingComponent from './loading';
import SelectControlComponent from './selectControl';
import InputArticleComponent from './inputArticle';
import OutputArticleComponent from './outputArticle';

// * Function
import setDefaultParameter from '../js/function/setDefaultParameter';

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
    const _param = setDefaultParameter(data, parameter);

    this.setState(() => ({
      parameter: _param,
      loading: {
        control: false
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