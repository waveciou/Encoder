const encodeSubstitutionCipher = require('../src/resources/js/function/encodeSubstitutionCipher');
const param = require('./_defaultConfigParam');

/**
  * 替換式密碼轉換（編碼）
  * @param { String } payload
  * @param { Number } tableIndex
  * @param { Object } $param
  * @returns { String }
  */

test ('測試替換式密碼轉換', () => {
  expect(encodeSubstitutionCipher('138694754795234975766626813655356290', 0, param)).toBe('l86gv47R2349v7666Eei55FB90A');
});