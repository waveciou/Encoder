import unicodeValidator from '@/Function/unicodeValidator';

/**
 * 驗證是否為 Unicode 值
 * @param { String }
 * @returns { Boolean }
 * @condition 31 < n < 65536, n = 10
 */

test('測試數值：0 ~ 35', () => {
  for (let i = 0; i < 35; i++) {
    const result = i === 10 || i > 31 ? true : false;
    expect(unicodeValidator(`${i}`)).toBe(result);
  }
});

test('測試數值：65530 ~ 65545', () => {
  for (let i = 65530; i < 65545; i++) {
    const result = i < 65536 ? true : false;
    expect(unicodeValidator(`${i}`)).toBe(result);
  }
});
