const encodeHandler = require('../src/resources/js/function/encodeHandler');
const param = require('./_defaultConfigParam');

/**
  * 編碼演算法
  * @param { String } plaintext
  * @param { Object } $param
  * @param { Number } test_public_const
  * @returns { String }
  */

const plainText = '我要加密的文字';

test ('測試基本明文轉換', () => {
  expect(encodeHandler(plainText, param, 0)).toBe('138694754795234975766626813655356290');
});