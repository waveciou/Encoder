import setDefaultConfig from '@/Function/setDefaultConfig';

import data from '../resources/data/parameter.json';

const parameter = {
  alphabet: [],
  digits: 5,
  prime: [],
  table: [],
  tableKeyword: []
};

/**
  * 設定預設參數
  * @param { Object } defaultData
  * @param { Object } $config
  * @returns { Object }
  */

describe('測試預設參數', () => {
  test('digits', () => {
    expect(setDefaultConfig(data, parameter).digits).toBe(5);
  });

  test('table keyword', () => {
    expect(setDefaultConfig(data, parameter)['tableKeyword']).toHaveLength(62);
  });

  test('other key', () => {
    expect(setDefaultConfig(data, parameter).alphabet).toEqual(data.alphabet);
    expect(setDefaultConfig(data, parameter).prime).toEqual(data.prime);
    expect(setDefaultConfig(data, parameter).table).toEqual(data.table);
  });
});