import { I_Parameter } from '../../components/app';

/**
  * 轉換圖表索引數關鍵字
  * @param { Encode：Number, Decode：String } payload
  * @param { Boolean } isEncode
  * @param { Object } $param
  * @returns { Encode：String, Decode：Number }
  */

const getTableIndexKeyword = (payload: string, isEncode: boolean, $param: I_Parameter): string | number => {
  const keyWords: string[] = $param.tableKeyword;
  return isEncode ? keyWords[parseInt(payload, 10)] : keyWords.indexOf(payload);
};

export default getTableIndexKeyword;