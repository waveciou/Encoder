import { I_ConfigParam, I_Parameter } from '@/Interface/index';

/**
  * 設定預設參數
  * @param { Object } defaultData
  * @param { Object } $config
  * @returns { Object }
  */

const setDefaultConfig = (defaultData: I_Parameter, $config: I_ConfigParam): I_ConfigParam => {
  const { digits, tableKeyword } = $config;
  const { alphabet, prime, table } = defaultData;
  const result: I_ConfigParam = { alphabet, digits, prime, table, tableKeyword };

  result.tableKeyword = [...result.alphabet];

  for (let i = 0; i < 10; i++) {
    result.tableKeyword.push(`${i}`);
  }

  return result;
};

export default setDefaultConfig;