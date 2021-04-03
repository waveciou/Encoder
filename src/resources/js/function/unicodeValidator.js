/**
  * 驗證是否為 Unicode 值
  * @param { String } payload
  * @returns { Boolean }
  */

module.exports = function (payload) {
  if (typeof payload !== 'string') return false;

  const value = parseInt(payload);

  if (value === 10) return true;
  return value < 65536 && value > 31 ? true : false;
};