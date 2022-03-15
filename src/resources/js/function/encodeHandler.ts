import getRandomNumber from './getRandomNumber';
import encodeCaesarCipher from './encodeCaesarCipher';
import { I_Parameter } from '../../components/app';

/**
  * 編碼演算法
  * @param { String } plaintext
  * @param { Object } $param
  * @param { Number } test_public_const
  * @returns { String }
  */

const encodeHandler = (plaintext: string, $param: I_Parameter, test_public_const?: number) => {
  if (typeof plaintext !== 'string') return '';

  // 把字串轉成陣列
  const strArray: string[] = plaintext.split('');

  // 公用常數
  let publicConst: number | undefined = test_public_const;

  if (publicConst === undefined) {
    publicConst = getRandomNumber(0, 9);
  }

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