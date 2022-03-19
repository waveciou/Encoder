import getTableIndexKeyword from '@/Function/getTableIndexKeyword';
import { I_ConfigParam } from '@/Interface/index';

/**
  * 替換式密碼轉換（編碼）
  * @param { String } payload
  * @param { Number } tableIndex
  * @param { Object } $config
  * @returns { String }
  */

const encodeSubstitutionCipher = (payload: string, tableIndex: number, $config: I_ConfigParam): string => {
  // 取得對應的對照表
  const table: string[] = $config.table[tableIndex];
  let result = '';

  // 將對應的字母替換上去
  for (let i = 0; i < payload.length; i += 2) {
    let text = `${payload[i]}`;
    const nextText: string = payload[i + 1];

    if (nextText) {
      text = `${text}${nextText}`;
    }

    const index: number = table.indexOf(text);
    const replaceText: string = index >= 0 ? $config.alphabet[index] : text;
    result = result + replaceText;
  }

  // 將對照表索引數添加至密文最後面
  const tableKey: string = getTableIndexKeyword(`${tableIndex}`, true, $config);

  return `${result}${tableKey}`;
};

export default encodeSubstitutionCipher;