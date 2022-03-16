import decodeCaesarCipher from '@/Functions/decodeCaesarCipher';
import unicodeValidator from '@/Functions/unicodeValidator';
import { I_Parameter } from '@/Interfaces/index';

/**
  * 解碼演算法
  * @param { String } ciphertext
  * @param { Object } $param
  * @returns { String }
  */

const decodeHandler = (ciphertext: string, $param: I_Parameter): string => {
  if (typeof ciphertext !== 'string') return '';

  // 判斷傳入值是否可以轉為數字
  let isError: boolean = parseInt(ciphertext, 10) ? false : true;
  if (isError) return 'error';

  // 取得密文裡的公用常數，並將密文轉成陣列
  const strArray: string[] = ciphertext.split('');
  const publicConst: number = parseInt(strArray[strArray.length - 1], 10);
  strArray.splice(strArray.length - 1, 1);

  // 把密文陣列以每 5 個字串組成新陣列
  const codeArray: string[] = [];

  for (let i = 0; i < strArray.length; i += $param.digits) {
    codeArray.push(strArray.slice(i, i + $param.digits).join(''));
  }

  // 取得公用常數值與私用常數值乘積列表
  const publicPrime: number = $param.prime[publicConst];
  const keysArray: number[] = $param.prime.map((prime: number) => prime * publicPrime);

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
    return String.fromCharCode(parseInt(plainCode, 10));
  });

  const result: string = resultArray.join('').trim();

  if (result === '') isError = true;
  return isError ? 'error' : result;
};

export default decodeHandler;