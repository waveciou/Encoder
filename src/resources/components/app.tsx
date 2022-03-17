import React, { useEffect, useState } from 'react';

import InputArticleComponent from '@/Components/inputArticle';
import LoadingComponent from '@/Components/loading';
import OutputArticleComponent from '@/Components/outputArticle';
import SelectControlComponent from '@/Components/selectControl';
import decodeHandler from '@/Functions/decodeHandler';
import decodeSubstitutionCipher from '@/Functions/decodeSubstitutionCipher';
import encodeHandler from '@/Functions/encodeHandler';
import encodeSubstitutionCipher from '@/Functions/encodeSubstitutionCipher';
import getRandomNumber from '@/Functions/getRandomNumber';
import setDefaultParam from '@/Functions/setDefaultParam';
import { I_Loading, I_Parameter } from '@/Interfaces/index';

import pkg from '../../../package.json';
import parameterData from '../data/parameter.json';

const App = () => {
  const [ textInput, setTextInput ] = useState<string>('');
  const [ textOutput, setTextOutput ] = useState<string>('');
  const [ encodeSelected, setEncodeSelected ] = useState<boolean>(true);

  const [ parameter, setParameter ] = useState<I_Parameter>({
    alphabet: [],
    digits: 5,
    prime: [],
    table: [],
    tableKeyword: []
  });

  const [ loading, setLoading ] = useState<I_Loading>({
    control: true,
    type: ''
  });

  useEffect(() => {
    const param: I_Parameter = setDefaultParam(parameterData, parameter);

    setParameter({ ...param });
    setLoading({ control: false, type: '' });
  }, []);

  // * 更新輸入明文
  const updateTextInputHandler = (payload: string): void => setTextInput(payload);

  // * 編解碼選擇（Radio Button）
  const setSelectedHandler = (payload: boolean): void => {
    clearHandler();
    setEncodeSelected(payload);
  };

  // * 清除 Input 和 Output 的內容
  const clearHandler = (): void => {
    setTextInput('');
    setTextOutput('');
  };

  // * 送出內容（編碼或解碼）
  const submitHandler = (): false => {
    const result: string = computedCode(encodeSelected);
    setTextOutput(result);
    setLoading({ control: false, type: '' });
    return false;
  };

  // * 判斷目前是編碼或解碼，並回傳對應的編解碼值
  const computedCode = (isEncode: boolean): string => {
    setLoading({
      control: true,
      type: isEncode ? 'encode' : 'decode'
    });

    if (isEncode) {
      // 編碼
      const code: string = encodeHandler(textInput, parameter);
      const tableKey: number = getRandomNumber(0, parameter.tableKeyword.length);
      return encodeSubstitutionCipher(code, tableKey, parameter);
    } else {
      // 解碼
      const code: string = decodeSubstitutionCipher(textInput, parameter);
      return decodeHandler(code, parameter);
    }
  };

  // * 輸入欄的 Placeholder
  const placeholderHandler = (isEncode: boolean): string => {
    const encode = 'Please enter the some text for Encode.';
    const decode = 'Please enter the some text for Decode.';
    return isEncode ? encode : decode;
  };

  return (
    <>
      <div className="main">
        <SelectControlComponent
          selected={ encodeSelected }
          setSelected={ setSelectedHandler }
        />

        <InputArticleComponent
          textInput={ textInput }
          placeholder={ placeholderHandler(encodeSelected) }
          updateTextInput={ updateTextInputHandler }
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
      <div className="copyright">Version: {pkg.version}<br />Created By <a href="https://github.com/waveciou" target="_blank" title="GitHub @waveciou" rel="noreferrer">@waveciou</a></div>
    </>
  );
};

export default App;