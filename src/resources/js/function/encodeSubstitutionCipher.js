const getTableIndexKeyword = require('./getTableIndexKeyword');

/**
  * 替換式密碼轉換（編碼）
  * @param { String } payload
  * @param { Number } tableIndex
  * @param { Object } $param
  * @returns { String }
  */

module.exports = function (payload, tableIndex, $param) {
  if (typeof payload !== 'string') return;
  if (typeof tableIndex !== 'number') return;

  // 取得對應的對照表
  const table = $param.table[tableIndex];
  let result = '';

  // 將對應的字母替換上去
  for (let i = 0; i < payload.length; i += 2) {
    let text = `${payload[i]}`;
    let nextText = payload[i + 1];

    if (nextText) {
      text = `${text}${nextText}`;
    }

    let index = table.indexOf(text);
    let replaceText = index >= 0 ? $param.alphabet[index] : text;
    result = result + replaceText;
  }

  // 將對照表索引數添加至密文最後面
  let tableKey = getTableIndexKeyword(tableIndex, true, $param);
  result = result + `${tableKey}`;

  return result;
};