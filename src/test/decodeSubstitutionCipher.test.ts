import decodeSubstitutionCipher from '@/Function/decodeSubstitutionCipher';
import param from '@/Test/_defaultConfigParam';

/**
  * 替換式密碼轉換（解碼）
  * @param { String } payload
  * @param { Object } $config
  * @returns { String }
  */

test('測試替換式密碼轉換', () => {
  expect(decodeSubstitutionCipher('l86gv47R2349v7666Eei55FB90A', param)).toBe('138694754795234975766626813655356290');
});