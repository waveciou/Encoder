import React, { useEffect, useState } from 'react';

import InputArticleComponent from '@/Component/inputArticle';
import LoadingComponent from '@/Component/loading';
import OutputArticleComponent from '@/Component/outputArticle';
import SelecterComponent from '@/Component/selecter';
import decodeHandler from '@/Function/decodeHandler';
import decodeSubstitutionCipher from '@/Function/decodeSubstitutionCipher';
import encodeHandler from '@/Function/encodeHandler';
import encodeSubstitutionCipher from '@/Function/encodeSubstitutionCipher';
import getRandomNumber from '@/Function/getRandomNumber';
import setDefaultConfig from '@/Function/setDefaultConfig';
import { I_ConfigParam, I_Loading } from '@/Interface/index';

import pkg from '../../../package.json';
import parameterData from '../data/parameter.json';

const App = () => {
  const [textInput, setTextInput] = useState<string>('');
  const [textOutput, setTextOutput] = useState<string>('');
  const [encodeSelected, setEncodeSelected] = useState<boolean>(true);
  const [processTime, setProcessTime] = useState<number | null>(null);

  const [parameter, setParameter] = useState<I_ConfigParam>({
    alphabet: [],
    digits: 5,
    prime: [],
    table: [],
    tableKeyword: [],
  });

  const [loading, setLoading] = useState<I_Loading>({
    control: true,
    type: '',
  });

  useEffect(() => {
    const param: I_ConfigParam = setDefaultConfig(parameterData, parameter);

    setParameter({ ...param });
    setLoading({ control: false, type: '' });
  }, []);

  // * 更新輸入明文
  const updateTextInputHandler = (payload: string): void =>
    setTextInput(payload);

  // * 編解碼選擇（Radio Button）
  const setSelectedHandler = (payload: boolean): void => {
    clearHandler();
    setEncodeSelected(payload);
  };

  // * 清除 Input 和 Output 的內容
  const clearHandler = (): void => {
    setTextInput('');
    setTextOutput('');
    setProcessTime(null);
  };

  // * 取得時間
  const getDateTimeHandler = (): number => {
    const date: Date = new Date();
    return date.getTime();
  };

  // * 送出內容（編碼或解碼）
  const submitHandler = (): false => {
    if (textInput === '') {
      return false;
    }

    const startTime: number = getDateTimeHandler();
    const result: string = computedCode(encodeSelected);
    const endTime: number = getDateTimeHandler();
    const time: number = endTime - startTime || 1;

    setTextOutput(result);
    setProcessTime(time);
    setLoading({ control: false, type: '' });
    return false;
  };

  // * 判斷目前是編碼或解碼，並回傳對應的編解碼值
  const computedCode = (isEncode: boolean): string => {
    setLoading({
      control: true,
      type: isEncode ? 'encode' : 'decode',
    });

    if (isEncode) {
      // 編碼
      const code: string = encodeHandler(textInput, parameter);
      const tableKey: number = getRandomNumber(
        0,
        parameter.tableKeyword.length
      );
      return encodeSubstitutionCipher(code, tableKey, parameter);
    } else {
      // 解碼
      const code: string = decodeSubstitutionCipher(textInput, parameter);
      return decodeHandler(code, parameter);
    }
  };

  // * 輸入欄的 Placeholder
  const placeholderHandler = (isEncode: boolean): string => {
    const encode = 'Please input the some text for Encode.';
    const decode = 'Please input the some text for Decode.';
    return isEncode ? encode : decode;
  };

  return (
    <>
      <div className="my-8">
        <SelecterComponent
          selected={encodeSelected}
          setSelected={setSelectedHandler}
        />

        <InputArticleComponent
          textInput={textInput}
          placeholder={placeholderHandler(encodeSelected)}
          updateTextInput={updateTextInputHandler}
        />

        <div className="my-4 flex items-center justify-between flex-wrap mobile:justify-center">
          <button
            className="w-full py-2.5 px-6 my-2 block text-mobile bg-transparent border border-white border-solid rounded-md outline-none cursor-pointer tracking-wide leading-relaxed box-border small:w-[calc((100%-10px)/2)] mobile:w-auto mobile:min-w-[160px] mobile:mx-1.5 desktop:py-2 desktop:text-desktop desktop:hover:text-black desktop:hover:bg-white active:text-black active:bg-white"
            title="Submit"
            onClick={submitHandler}
          >
            Submit
          </button>
          <button
            className="w-full py-2.5 px-6 my-2 block text-mobile bg-transparent border border-white border-solid rounded-md outline-none cursor-pointer tracking-wide leading-relaxed box-border small:w-[calc((100%-10px)/2)] mobile:w-auto mobile:min-w-[160px] mobile:mx-1.5 desktop:py-2 desktop:text-desktop desktop:hover:text-black desktop:hover:bg-white active:text-black active:bg-white"
            title="Clear"
            onClick={clearHandler}
          >
            Clear
          </button>
        </div>

        <OutputArticleComponent
          textOutput={textOutput}
          processTime={processTime}
        />

        {loading.control && <LoadingComponent type={loading.type} />}
      </div>
      <div className="w-full flex items-center justify-center before:content-[''] before:block before:w-10 before:h-10 before:mr-2 before:bg-[url('../img/github.svg')] before:bg-no-repeat before:bg-center">
        <div className="text-mobile leading-6">
          Version:{' '}
          <a
            href="https://github.com/waveciou/Encoder"
            target="_blank"
            title={pkg.version}
            rel="noreferrer"
            className="desktop:hover:text-yellow"
          >
            {pkg.version}
          </a>
          <br />
          Created By{' '}
          <a
            href="https://github.com/waveciou"
            target="_blank"
            title="GitHub @waveciou"
            rel="noreferrer"
            className="desktop:hover:text-yellow"
          >
            @waveciou
          </a>
        </div>
      </div>
    </>
  );
};

export default App;
