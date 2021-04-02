/**
  * 驗證是否為 Unicode 值
  * @param { Number } payload
  * @returns { Boolean }
  */

module.exports = function (payload) {
  if (typeof payload !== 'number') return false;
  if (payload === 10) return true;
  return payload < 65536 && payload > 31 ? true : false;
};