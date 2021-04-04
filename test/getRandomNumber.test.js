const getRandomNumber = require('../src/resources/js/function/getRandomNumber');

/**
  * 回傳亂數
  * @param { Number } min
  * @param { Number } max
  * @returns { Number }
  */

test('亂數數值測試', () => {
  const min = 0;
  const max = 9;
  const randomNumber = getRandomNumber(min, max);

  expect(randomNumber).toBeGreaterThanOrEqual(min);
  expect(randomNumber).toBeLessThanOrEqual(max);
});