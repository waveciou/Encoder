import parseToInt from '@/Functions/parseToInt';

/**
  * 凱薩密碼轉換（編碼）
  * @param { Array } payload
  * @param { Number } offset
  * @returns { String }
  */

const encodeCaesarCipher = (payload: string[], offset: number): string => {
  const result: number[] = payload.map((item: string, index: number) => {
    const vector: number = index + 1 === 5 ? (index + 2) : (index + 1);
    return (parseToInt(item) + (offset * vector)) % 10;
  });

  return result.join('');
};

export default encodeCaesarCipher;