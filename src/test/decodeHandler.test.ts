import decodeHandler from '@/Function/decodeHandler';
import param from '@/Test/_defaultConfigParam';

/**
  * 解碼演算法
  * @param { String } ciphertext
  * @param { Object } $config
  * @returns { String }
  */

test('測試密文轉換', () => {
  expect(decodeHandler('106630', param)).toBe('好');
  expect(decodeHandler('43011686200', param)).toBe('👀');
  expect(decodeHandler('987960', param)).toBe('error');

  expect(decodeHandler('138694754795234975766626813655356290', param)).toBe('我要加密的文字');
});
