import encodeCaesarCipher from '@/Function/encodeCaesarCipher';
import getRandomNumber from '@/Function/getRandomNumber';
import { IConfigParam } from '@/Interface/index';

/**
 * 編碼演算法
 * @param { String } plaintext
 * @param { Object } $config
 * @param { Number } testPublicConst
 * @returns { String }
 */

const encodeHandler = (
  plaintext: string,
  $config: IConfigParam,
  testPublicConst?: number
): string => {
  // 把字串轉成陣列
  const strArray: string[] = plaintext.split('');

  // 公用常數
  const publicConst: number = testPublicConst ?? getRandomNumber(0, 9);

  const result: string[] = strArray.map((item: string, index: number) => {
    // 把明文轉成 unicode
    const unicode = `${item.charCodeAt(0)}`;
    const unicodeArray: string[] = unicode.split('');

    // 將 unicode 代碼補 0（5位數）
    const supValue: number = 0 - (unicodeArray.length - $config.digits);

    for (let i = 0; i < supValue; i++) {
      unicodeArray.unshift('0');
    }

    // 取得「公用常數」與「私用常數」的乘積，並做凱薩密碼處理
    const privateConst: number = index % 10;
    const privatePrime: number = $config.prime[privateConst];
    const publicPrime: number = $config.prime[publicConst];
    return encodeCaesarCipher(unicodeArray, privatePrime * publicPrime);
  });

  // 將公用常數添加至密文裡面
  result.push(`${publicConst}`);

  return result.join('');
};

export default encodeHandler;
