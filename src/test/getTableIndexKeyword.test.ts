import getTableIndexKeyword from '@/Function/getTableIndexKeyword';
import $config from '@/Test/_configParam';

/**
  * 轉換圖表索引數關鍵字
  * @param { String } payload
  * @param { Boolean } isEncode
  * @param { Object } $config
  * @returns { String }
  */

test('測試基本數值', () => {
  expect(getTableIndexKeyword('0', true, $config)).toBe('A');
  expect(getTableIndexKeyword('A', false, $config)).toBe('0');
});

test('測試輸出數值型別的正確性', () => {
  expect(typeof (getTableIndexKeyword('0', true, $config))).toBe('string');
  expect(typeof (getTableIndexKeyword('A', false, $config))).toBe('string');
});