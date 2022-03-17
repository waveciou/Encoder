import getTableIndexKeyword from '@/Functions/getTableIndexKeyword';
import { I_Parameter } from '@/Interfaces/index';

/**
  * 替換式密碼轉換（解碼）
  * @param { String } payload
  * @param { Object } $param
  * @returns { String }
  */

const decodeSubstitutionCipher = (payload: string, $param: I_Parameter): string => {
  // 取得對照表索引數
  const strArray: string[] = payload.split('');
  const tableKey: string = strArray.splice(strArray.length - 1, 1)[0];
  const tableIndex: string = getTableIndexKeyword(tableKey, false, $param);

  // 取得對應的對照表
  const table: string[] = $param.table[parseInt(tableIndex, 10)];

  // 將對應的字母替換上去
  return strArray.reduce((prev: string, current: string) => {
    const index: number = $param.alphabet.indexOf(current);
    const replaceText: string = index >= 0 ? table[index] : current;
    return `${prev}${replaceText}`;
  }, '');
};

export default decodeSubstitutionCipher;