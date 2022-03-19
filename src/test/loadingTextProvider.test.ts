import loaderHeading from '@/Function/loaderHeading';

/**
  * Loading 顯示文字
  * @param { String } type
  * @returns { String }
  */

test('encode', () => {
  expect(loaderHeading('encode')).toBe('Encoding...');
});

test('decode', () => {
  expect(loaderHeading('decode')).toBe('Decoding...');
});