/**
  * 回傳亂數
  * @param { Number } min
  * @param { Number } max
  * @returns { Number }
  */

module.exports = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};