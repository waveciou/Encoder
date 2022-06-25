import decodeHandler from '@/Function/decodeHandler';
import $config from '@/Test/_configParam';

/**
 * 解碼演算法
 * @param { String } ciphertext
 * @param { Object } $config
 * @returns { String }
 */

test('測試密文轉換', () => {
  expect(decodeHandler('106630', $config)).toBe('好');
  expect(decodeHandler('43011686200', $config)).toBe('👀');
  expect(decodeHandler('987960', $config)).toBe('error');
  expect(decodeHandler('138694754795234975766626813655356290', $config)).toBe(
    '我要加密的文字'
  );
});
