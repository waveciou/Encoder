import { IConfigParam, IParameter } from '@/Interface/index';

/**
 * 設定預設參數
 * @param { Object } defaultData
 * @param { Object } $config
 * @returns { Object }
 */

const setDefaultConfig = (
  defaultData: IParameter,
  $config: IConfigParam
): IConfigParam => {
  const { digits, tableKeyword } = $config;
  const { alphabet, prime, table } = defaultData;
  const result: IConfigParam = {
    alphabet,
    digits,
    prime,
    table,
    tableKeyword,
  };

  result.tableKeyword = [...result.alphabet];

  for (let i = 0; i < 10; i++) {
    result.tableKeyword.push(`${i}`);
  }

  return result;
};

export default setDefaultConfig;
