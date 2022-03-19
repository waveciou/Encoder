import parseToInt from '@/Function/parseToInt';

/**
  * 驗證是否為 Unicode 值
  * @param { String } payload
  * @returns { Boolean }
  */

const unicodeValidator = (payload: string): boolean => {
  const value: number = parseToInt(payload);

  if (value === 10) return true;
  return value < 65536 && value > 31 ? true : false;
};

export default unicodeValidator;