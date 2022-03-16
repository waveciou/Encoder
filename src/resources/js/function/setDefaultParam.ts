import { I_Parameter, I_ParameterData } from '../../components/app';

/**
  * 設定預設參數
  * @param { Object } defaultData
  * @param { Object } $param
  * @returns { Object }
  */

const setDefaultParam = (defaultData: I_ParameterData, $param: I_Parameter) => {
  const result: {
    digits: number;
    prime: number[];
    table: string[][];
    alphabet: string[];
    tableKeyword: string[];
  } = {
    digits: $param.digits,
    prime: defaultData.prime,
    table: defaultData.table,
    alphabet: defaultData.alphabet,
    tableKeyword: $param.tableKeyword,
  };

  // Object.keys($param).forEach((key: string) => {
  //   result[key] = defaultData[key] || $param[key];
  // });

  result.tableKeyword = [...result.alphabet];

  for (let i = 0; i < 10; i++) {
    result.tableKeyword.push(`${i}`);
  }

  return result;
};

export default setDefaultParam;