import encodeHandler from '@/Function/encodeHandler';
import param from '@/Test/_defaultConfigParam';

/**
  * 編碼演算法
  * @param { String } plaintext
  * @param { Object } $config
  * @param { Number } test_public_const
  * @returns { String }
  */

test('測試明文轉換', () => {
  expect(encodeHandler('好', param, 0)).toBe('106630');
  expect(encodeHandler('👀', param, 0)).toBe('43011686200');
  expect(encodeHandler(' ', param, 0)).toBe('987960');

  expect(encodeHandler('我要加密的文字', param, 0)).toBe('138694754795234975766626813655356290');
});