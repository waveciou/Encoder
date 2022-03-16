import { I_Parameter } from '@/Components/app';
import encodeCaesarCipher from '@/Functions/encodeCaesarCipher';
import getRandomNumber from '@/Functions/getRandomNumber';

/**
  * 編碼演算法
  * @param { String } plaintext
  * @param { Object } $param
  * @param { Number } testPublicConst
  * @returns { String }
  */

const encodeHandler = (plaintext: string, $param: I_Parameter, testPublicConst?: number): string => {
  if (typeof plaintext !== 'string') return '';

  // 把字串轉成陣列
  const strArray: string[] = plaintext.split('');

  // 公用常數
  const publicConst: number = testPublicConst ?? getRandomNumber(0, 9);

  const resultArray: string[] = strArray.map((itemText, index) => {
    // 把明文轉成 unicode
    const unicode = `${itemText.charCodeAt(0)}`;
    const unicodeArray: string[] = unicode.split('');

    // 將 unicode 代碼補 0（5位數）
    const supValue: number = 0 - (unicodeArray.length - $param.digits);

    for (let i = 0; i < supValue; i++) {
      unicodeArray.unshift('0');
    }

    // 取得「公用常數」與「私用常數」的乘積，並做凱薩密碼處理
    const privateConst: number = index % 10;
    const privatePrime: number = $param.prime[privateConst];
    const publicPrime: number = $param.prime[publicConst as number];
    return encodeCaesarCipher(unicodeArray, privatePrime * publicPrime);
  });

  // 將公用常數添加至密文裡面
  resultArray.push(`${publicConst}`);
  return resultArray.join('');
};

export default encodeHandler;