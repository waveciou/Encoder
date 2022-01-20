const getTableIndexKeyword = require('./getTableIndexKeyword');

/**
  * 替換式密碼轉換（解碼）
  * @param { String } payload
  * @param { Object } $param
  * @returns { String }
  */

module.exports = function (payload, $param) {
  if (typeof payload !== 'string') return;

  // 取得對照表索引數
  const strArray = payload.split('');
  const tableKey = strArray.splice(strArray.length - 1, 1)[0];
  const tableIndex = getTableIndexKeyword(tableKey, false, $param);

  // 取得對應的對照表
  const table = $param.table[tableIndex];

  // 將對應的字母替換上去
  return strArray.reduce((prev, current) => {
    const index = $param.alphabet.indexOf(current);
    const replaceText = index >= 0 ? table[index] : current;
    return `${prev}${replaceText}`;
  }, '');
};