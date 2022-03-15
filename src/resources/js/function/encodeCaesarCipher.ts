/**
  * 凱薩密碼轉換（編碼）
  * @param { Array } payload
  * @param { Number } offset
  * @returns { String }
  */

const encodeCaesarCipher = (payload: string[], offset: number): string => {
  if (typeof offset !== 'number') return '';

  const resultArray: number[] = payload.map((item: string, index: number) => {
    const vector: number = index + 1 === 5 ? (index + 2) : (index + 1);
    return (parseInt(item, 10) + (offset * vector)) % 10;
  });

  return resultArray.join('');
};

export default encodeCaesarCipher;