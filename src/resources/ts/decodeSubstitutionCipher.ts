import getTableIndexKeyword from '@/Function/getTableIndexKeyword';
import parseToInt from '@/Function/parseToInt';
import { I_ConfigParam } from '@/Interface/index';

/**
  * 替換式密碼轉換（解碼）
  * @param { String } payload
  * @param { Object } $config
  * @returns { String }
  */

const decodeSubstitutionCipher = (payload: string, $config: I_ConfigParam): string => {
  // 取得對照表索引數
  const strArray: string[] = payload.split('');
  const tableKey: string = strArray.splice(strArray.length - 1, 1)[0];
  const tableIndex: string = getTableIndexKeyword(tableKey, false, $config);

  // 取得對應的對照表
  const table: string[] = $config.table[parseToInt(tableIndex)];

  // 將對應的字母替換上去
  return strArray.reduce((prev: string, current: string) => {
    const index: number = $config.alphabet.indexOf(current);
    const replaceText: string = index >= 0 ? table[index] : current;
    return `${prev}${replaceText}`;
  }, '');
};

export default decodeSubstitutionCipher;