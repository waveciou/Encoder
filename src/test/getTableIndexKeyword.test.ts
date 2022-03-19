import getTableIndexKeyword from '@/Function/getTableIndexKeyword';
import param from '@/Test/_defaultConfigParam';

/**
  * 轉換圖表索引數關鍵字
  * @param { String } payload
  * @param { Boolean } isEncode
  * @param { Object } $config
  * @returns { String }
  */

test('測試基本數值', () => {
  expect(getTableIndexKeyword('0', true, param)).toBe('A');
  expect(getTableIndexKeyword('A', false, param)).toBe('0');
});

test('測試輸出數值型別的正確性', () => {
  expect(typeof (getTableIndexKeyword('0', true, param))).toBe('string');
  expect(typeof (getTableIndexKeyword('A', false, param))).toBe('string');
});