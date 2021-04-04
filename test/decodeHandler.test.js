const decodeHandler = require('../src/resources/js/function/decodeHandler');
const param = require('./_defaultConfigParam');

/**
  * 解碼演算法
  * @param { String } ciphertext
  * @param { Object } $param
  * @returns { String }
  */

const ciphertext = '138694754795234975766626813655356290';

test ('測試密文轉換', () => {
  expect(decodeHandler(ciphertext, param)).toBe('我要加密的文字');
});
