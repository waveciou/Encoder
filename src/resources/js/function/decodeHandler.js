const decodeCaesarCipher = require('./decodeCaesarCipher');
const unicodeValidator = require('./unicodeValidator');

/**
  * 解碼演算法
  * @param { String } ciphertext
  * @param { Object } $param
  * @returns { String }
  */

module.exports = function (ciphertext, $param) {
  // 判斷傳入值是否可以轉為數字
  let isError = parseInt(ciphertext) ? false : true;
  if (isError === true) return 'error';

  // 取得密文裡的公用常數，並將密文轉成陣列
  let strArray = ciphertext.split('');
  const publicConst = parseInt(strArray[strArray.length - 1]);
  strArray.splice(strArray.length - 1, 1);

  // 把密文陣列以每 5 個字串組成新陣列
  let codeArray = [];

  for (let i = 0; i < strArray.length; i += $param.digits) {
    codeArray.push(strArray.slice(i, i + $param.digits).join(''));
  }

  // 取得公用常數值與私用常數值乘積列表
  const publicPrime = $param.prime[publicConst];
  const keysArray = $param.prime.map(prime => prime * publicPrime);

  // 處理並轉換密文
  const resultArray = codeArray.map((cipherCode, index) => {
    let cipherCodeArray = cipherCode.split('');
    let plainCode = '';

    // 將乘積列表全部帶進凱薩密碼驗證
    for (let i = 0; i < keysArray.length; i++) {
      let _plainCode = decodeCaesarCipher(cipherCodeArray, keysArray[i]);
      if (index % 10 === i) {
        plainCode = _plainCode;
        break;
      }
    }

    // 驗證是否為 unicode
    if (isError === false) {
      isError = !unicodeValidator(plainCode);
    }

    // unicode 轉回明文
    const plainText = String.fromCharCode(`${plainCode}`);
    return plainText;
  });

  const result = resultArray.join('').trim();

  if (result === '') isError = true;
  return isError === true ? 'error' : result;
};