const getTableIndexKeyword = require('../src/resources/js/function/getTableIndexKeyword');
const param = require('./_defaultConfigParam');

/**
  * 轉換圖表索引數關鍵字
  * @param { Encode：Number, Decode：String } payload
  * @param { Boolean } isEncode
  * @param { Object } $config
  * @returns { Encode：String, Decode：Number }
  */

test('測試基本數值', () => {
  expect(getTableIndexKeyword(0, true, param)).toBe('A');
  expect(getTableIndexKeyword('A', false, param)).toBe(0);
});

test('測試輸出數值型別的正確性', () => {
  expect(getTableIndexKeyword('0', true, param)).toBeUndefined();
  expect(getTableIndexKeyword(0, false, param)).toBeUndefined();

  expect(typeof (getTableIndexKeyword(0, true, param))).toBe('string');
  expect(typeof (getTableIndexKeyword('A', false, param))).toBe('number');
});