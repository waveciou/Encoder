const loadingTextProvider = require('../src/resources/js/function/loadingTextProvider');

/**
  * Loading 顯示文字
  * @param { String } type
  * @returns { String }
  */

test('encode', () => {
  expect(loadingTextProvider('encode')).toBe('Encoding...');
});

test('decode', () => {
  expect(loadingTextProvider('decode')).toBe('Decoding...');
});

test('測試其他型別', () => {
  const testCase = [ '', 'String', true, false, [], {}, null, undefined, NaN ];

  for (let i = 0; i < testCase.length; i++) {
    expect(loadingTextProvider(testCase[i])).toBe('Loading...');
  }
});