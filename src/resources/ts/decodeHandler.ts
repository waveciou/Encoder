import decodeCaesarCipher from '@/Function/decodeCaesarCipher';
import parseToInt from '@/Function/parseToInt';
import unicodeValidator from '@/Function/unicodeValidator';
import { I_ConfigParam } from '@/Interface/index';

/**
  * 解碼演算法
  * @param { String } ciphertext
  * @param { Object } $config
  * @returns { String }
  */

const decodeHandler = (ciphertext: string, $config: I_ConfigParam): string => {
  // 判斷傳入值是否可以轉為數字
  let isError: boolean = parseToInt(ciphertext) ? false : true;
  if (isError) return 'error';

  // 取得密文裡的公用常數，並將密文轉成陣列
  const strArray: string[] = ciphertext.split('');
  const publicConst: number = parseToInt(strArray[strArray.length - 1]);

  strArray.splice(strArray.length - 1, 1);

  // 把密文陣列以每 5 個字串組成新陣列
  const codeArray: string[] = [];

  for (let i = 0; i < strArray.length; i += $config.digits) {
    codeArray.push(strArray.slice(i, i + $config.digits).join(''));
  }

  // 取得公用常數值與私用常數值乘積列表
  const publicPrime: number = $config.prime[publicConst];
  const keysArray: number[] = $config.prime.map((prime: number) => prime * publicPrime);

  // 處理並轉換密文
  const resultArray: string[] = codeArray.map((cipherCode: string, index: number) => {
    const cipherCodeArray: string[] = cipherCode.split('');
    let plainCode = '';

    // 將乘積列表全部帶進凱薩密碼驗證
    for (let i = 0; i < keysArray.length; i++) {
      const _plainCode: string = decodeCaesarCipher(cipherCodeArray, keysArray[i]);
      if (index % 10 === i) {
        plainCode = _plainCode;
        break;
      }
    }

    // 驗證是否為 unicode
    if (!isError) {
      isError = !unicodeValidator(plainCode);
    }

    // unicode 轉回明文
    return String.fromCharCode(parseToInt(plainCode));
  });

  const result: string = resultArray.join('').trim();

  if (result === '') isError = true;

  return isError ? 'error' : result;
};

export default decodeHandler;