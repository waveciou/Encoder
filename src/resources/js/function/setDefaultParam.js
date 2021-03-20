/**
  * 設定預設參數
  * @param { Object } defaultData
  * @param { Object } $param
  * @returns { Object }
  */

module.exports = function (defaultData, $param) {
  const result = {};

  Object.keys($param).forEach(key => {
    result[key] = defaultData[key] || $param[key];
  });

  result.tableKeyword = [...result.alphabet];

  for (let i = 0; i < 10; i++) {
    result.tableKeyword.push(`${i}`);
  }

  return result;
};