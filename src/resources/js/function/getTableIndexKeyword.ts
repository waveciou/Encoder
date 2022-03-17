import { I_Parameter } from '@/Interfaces/index';

/**
  * 轉換圖表索引數關鍵字
  * @param { String } payload
  * @param { Boolean } isEncode
  * @param { Object } $param
  * @returns { String }
  */

const getTableIndexKeyword = (payload: string, isEncode: boolean, $param: I_Parameter): string => {
  const keyWords: string[] = $param.tableKeyword;
  const result: string = isEncode ? keyWords[parseInt(payload, 10)] : `${keyWords.indexOf(payload)}`;
  return result;
};

export default getTableIndexKeyword;