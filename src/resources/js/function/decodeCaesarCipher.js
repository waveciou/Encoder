/**
  * 凱薩密碼轉換（解碼）
  * @param { Array } payload
  * @param { Number } offset
  * @returns { String }
  */

module.exports = function (payload, offset) {
  let resultArray = payload.map((item, index) => {
    let result = null;
    const vector = index + 1 === 5 ? (index + 2) : (index + 1);

    for (let i = 0; i < 10; i++) {
      if (((i + (offset * vector)) % 10) === parseInt(item)) {
        result = i;
        break;
      }
    }

    return result;
  });

  return resultArray.join('');
};