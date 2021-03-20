/**
  * 轉換圖表索引數關鍵字
  * @param { Encode：Number, Decode：String } payload
  * @param { Boolean } isEncode
  * @param { Object } $param
  * @returns { Encode：String, Decode：Number }
  */

module.exports = function (payload, isEncode, $param) {
  let keyWords = $param.tableKeyword;
  const result = isEncode === true ? keyWords[payload] : keyWords.indexOf(payload);

  return result;
};