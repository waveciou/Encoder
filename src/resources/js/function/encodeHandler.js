const getRandomNumber = require('./getRandomNumber');
const encodeCaesarCipher = require('./encodeCaesarCipher');

/**
  * 編碼演算法
  * @param { String } plaintext
  * @param { Object } $param
  * @param { Number } test_public_const
  * @returns { String }
  */

module.exports = function (plaintext, $param, test_public_const) {
  // 把字串轉成陣列
  const strArray = plaintext.split('');

  // 公用常數
  let publicConst = test_public_const;

  if (publicConst === undefined) {
    publicConst = getRandomNumber(0, 9);
  }

  let resultArray = strArray.map((itemText, index) => {
    // 把明文轉成 unicode
    const unicode = `${itemText.charCodeAt(0)}`;
    let unicodeArray = unicode.split('');

    // 將 unicode 代碼補 0（5位數）
    const supValue = 0 - (unicodeArray.length - $param.digits);

    for (let i = 0; i < supValue; i++) {
      unicodeArray.unshift('0');
    }

    // 取得「公用常數」與「私用常數」的乘積，並做凱薩密碼處理
    const privateConst = index % 10;
    const privatePrime = $param.prime[privateConst];
    const publicPrime = $param.prime[publicConst];
    return encodeCaesarCipher(unicodeArray, privatePrime * publicPrime);
  });

  // 將公用常數添加至密文裡面
  resultArray.push(publicConst);
  return resultArray.join('');
};