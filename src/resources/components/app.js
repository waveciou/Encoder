import React, { useState, useEffect } from 'react';

// * Component
import LoadingComponent from './loading';
import SelectControlComponent from './selectControl';
import InputArticleComponent from './inputArticle';
import OutputArticleComponent from './outputArticle';

// * Function
import setDefaultParam from '../js/function/setDefaultParam';
import getRandomNumber from '../js/function/getRandomNumber';
import encodeHandler from '../js/function/encodeHandler';
import decodeHandler from '../js/function/decodeHandler';
import encodeSubstitutionCipher from '../js/function/encodeSubstitutionCipher';
import decodeSubstitutionCipher from '../js/function/decodeSubstitutionCipher';

// * Package
import pkg from '../../../package.json';

const App = () => {
  const [ textInput, setTextInput ] = useState('');
  const [ textOutput, setTextOutput ] = useState('');
  const [ encode_selected, setEncodeSelected ] = useState(true);

  const [ parameter, setParameter ] = useState({
    digits: 5,
    prime: [],
    table: [],
    alphabet: [],
    tableKeyword: []
  });

  const [ loading, setLoading ] = useState({ control: true, type: '' });

  useEffect(() => {
    const data = require('../data/parameter.json');
    const _param = setDefaultParam(data, parameter);

    setParameter({ ..._param });
    setLoading({ control: false, type: '' });
  }, []);

  // * 更新輸入明文
  const updateTextInputHandler = (payload) => setTextInput(payload);

  // * 編解碼選擇（Radio Button）
  const setSelectedHandler = (payload) => {
    clearHandler();
    setEncodeSelected(payload);
  };

  // * 清除 Input 和 Output 的內容
  const clearHandler = () => {
    setTextInput('');
    setTextOutput('');
  };

  // * 送出內容（編碼或解碼）
  const submitHandler = () => {
    if (textInput && typeof textInput === 'string') {
      const result = computedCode(encode_selected);
      setTextOutput(result);
      setLoading({ control: false, type: '' });
    }
    return false;
  };

  // * 判斷目前是編碼或解碼，並回傳對應的編解碼值
  const computedCode = (isEncode) => {
    setLoading({
      control: true,
      type: isEncode ? 'encode' : 'decode'
    });

    if (isEncode) {
      // 編碼
      const code = encodeHandler(textInput, parameter);
      const tableKey = getRandomNumber(0, parameter.tableKeyword.length);
      return encodeSubstitutionCipher(code, tableKey, parameter);
    } else {
      // 解碼
      const code = decodeSubstitutionCipher(textInput, parameter);
      return decodeHandler(code, parameter);
    }
  };

  // * 輸入欄的 Placeholder
  const placeholderHandler = (isEncode) => {
    const encode = 'Please enter the some text for Encode.';
    const decode = 'Please enter the some text for Decode.';
    return isEncode ? encode : decode;
  };

  return (
    <>
      <div className="main">
        <SelectControlComponent
          setEncodeSelected={ setSelectedHandler }
          encode_selected={ encode_selected }
        />

        <InputArticleComponent
          textInput={ textInput }
          updateTextInput={ updateTextInputHandler }
          placeholder={ placeholderHandler(encode_selected) }
        />

        <div className="row">
          <button
            className="btn"
            title="Submit"
            onClick={ submitHandler }
          >Submit</button>
          <button
            className="btn"
            title="Clear"
            onClick={ clearHandler }
          >Clear</button>
        </div>

        <OutputArticleComponent textOutput={ textOutput } />

        { loading.control && <LoadingComponent type={ loading.type } /> }
      </div>
      <div className="copyright">Version: {pkg.version}<br />Created By <a href="https://github.com/waveciou" target="_blank" title="GitHub @waveciou">@waveciou</a></div>
    </>
  );
};

export default App;