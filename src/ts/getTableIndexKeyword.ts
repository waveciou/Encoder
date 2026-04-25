import parseToInt from '@/Function/parseToInt';
import { IConfigParam } from '@/Interface/index';

/**
 * 轉換圖表索引數關鍵字
 * @param { String } payload
 * @param { Boolean } isEncode
 * @param { Object } $config
 * @returns { String }
 */

const getTableIndexKeyword = (
  payload: string,
  isEncode: boolean,
  $config: IConfigParam
): string => {
  const keyWords: string[] = $config.tableKeyword;
  const result: string = isEncode
    ? keyWords[parseToInt(payload)]
    : `${keyWords.indexOf(payload)}`;
  return result;
};

export default getTableIndexKeyword;
