/**
  * Loading 顯示文字
  * @param { String } type
  * @returns { String }
  */

module.exports = function (type) {
  let result = '';

  switch (type) {
  case 'encode':
    result = 'Encoding...';
    break;
  case 'decode':
    result = 'Decoding...';
    break;
  default:
    result = 'Loading...';
    break;
  }

  return result;
};