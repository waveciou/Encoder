/**
  * Loading 顯示文字
  * @param { String } type
  * @returns { String }
  */

export default function (type: string) {
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
}