import { I_Parameter, I_ParameterData } from '@/Interfaces/index';

/**
  * 設定預設參數
  * @param { Object } defaultData
  * @param { Object } $param
  * @returns { Object }
  */

const setDefaultParam = (defaultData: I_ParameterData, $param: I_Parameter): I_Parameter => {
  const { digits, tableKeyword } = $param;
  const { alphabet, prime, table } = defaultData;
  const result: I_Parameter = { alphabet, digits, prime, table, tableKeyword };

  result.tableKeyword = [...result.alphabet];

  for (let i = 0; i < 10; i++) {
    result.tableKeyword.push(`${i}`);
  }

  return result;
};

export default setDefaultParam;