/**
  * 凱薩密碼轉換（編碼）
  * @param { Array } payload
  * @param { Number } offset
  * @returns { String }
  */

module.exports = function (payload, offset) {
  if (typeof offset !== 'number') return;

  let resultArray = payload.map((item, index) => {
    const vector = index + 1 === 5 ? (index + 2) : (index + 1);
    return (parseInt(item, 10) + (offset * vector)) % 10;
  });

  return resultArray.join('');
};