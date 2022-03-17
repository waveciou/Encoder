/**
  * 凱薩密碼轉換（解碼）
  * @param { Array } payload
  * @param { Number } offset
  * @returns { String }
  */

const decodeCaesarCipher = (payload: string[], offset: number): string => {
  const result: number[] = payload.map((item: string, index: number) => {
    const vector: number = index + 1 === 5 ? (index + 2) : (index + 1);
    let _result = 0;

    for (let i = 0; i < 10; i++) {
      if (((i + (offset * vector)) % 10) === parseInt(item, 10)) {
        _result = i;
        break;
      }
    }

    return _result;
  });

  return result.join('');
};

export default decodeCaesarCipher;