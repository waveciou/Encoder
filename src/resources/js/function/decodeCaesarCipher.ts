/**
  * 凱薩密碼轉換（解碼）
  * @param { Array } payload
  * @param { Number } offset
  * @returns { String }
  */

export default function (payload: any[], offset: number) {
  if (typeof offset !== 'number') return;

  const resultArray = payload.map((item, index) => {
    const vector = index + 1 === 5 ? (index + 2) : (index + 1);
    let result = null;

    for (let i = 0; i < 10; i++) {
      if (((i + (offset * vector)) % 10) === parseInt(item, 10)) {
        result = i;
        break;
      }
    }

    return result;
  });

  return resultArray.join('');
}