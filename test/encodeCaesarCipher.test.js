const encodeCaesarCipher = require('../src/resources/js/function/encodeCaesarCipher');

/**
  * 凱薩密碼轉換（編碼）
  * @param { Array } payload
  * @param { Number } offset
  * @returns { String }
  */

const testCase = ['12345', '24681', '36927', '48263', '50509', '62845'];

test ('測試凱薩密碼轉換', () => {
  for (let i = 0; i < testCase.length; i++) {
    expect(encodeCaesarCipher(['1','2','3','4','5'], i)).toBe(testCase[i]);
  }
});