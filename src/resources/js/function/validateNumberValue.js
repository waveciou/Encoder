/**
  * 驗證是否為 Unicode 值
  * @param { Number } payload
  * @returns { Boolean }
  */

module.exports = function (payload) {
  return payload <= 65535 || payload >= 32 || payload === 10 ? true : false;
};