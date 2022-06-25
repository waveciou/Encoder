import decodeCaesarCipher from '@/Function/decodeCaesarCipher';

/**
 * 凱薩密碼轉換（解碼）
 * @param { Array } payload
 * @param { Number } offset
 * @returns { String }
 */

const testCase = ['12345', '24681', '36927', '48263', '50509', '62845'];

test('測試凱薩密碼轉換', () => {
  for (let i = 0; i < testCase.length; i++) {
    expect(decodeCaesarCipher(testCase[i].split(''), i)).toBe('12345');
  }
});
