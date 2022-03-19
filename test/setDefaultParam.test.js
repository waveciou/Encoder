const setDefaultParam = require('../src/resources/js/function/setDefaultParam');
const data = require('../src/resources/data/parameter.json');

const parameter = {
  digits: 5,
  prime: [],
  table: [],
  alphabet: [],
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
    expect(setDefaultParam(data, parameter).digits).toBe(5);
  });

  test('table keyword', () => {
    expect(setDefaultParam(data, parameter)['tableKeyword'].length).toBe(62);
  });

  const keyCase = ['prime', 'table', 'alphabet'];

  test('other key', () => {
    for (let i = 0; i < keyCase.length; i++) {
      expect(setDefaultParam(data, parameter)[keyCase[i]]).toEqual(data[keyCase[i]]);
    }
  });
});

describe('測試參數的型別', () => {
  test('String', () => {
    const testCase = ['tableKeyword', 'alphabet'];

    for (let i = 0; i < testCase.length; i++) {
      const _data = setDefaultParam(data, parameter)[testCase[i]];

      for (let j = 0; j < _data.length; j++) {
        expect(typeof (_data[j])).toBe('string');
      }
    }
  });

  test('Array', () => {
    const _data = setDefaultParam(data, parameter)['table'];

    for (let i = 0; i < _data.length; i++) {
      expect(Array.isArray(_data[i])).toBe(true);
    }
  });

  test('Number', () => {
    const _data = setDefaultParam(data, parameter)['prime'];

    for (let i = 0; i < _data.length; i++) {
      expect(typeof (_data[i])).toBe('number');
    }
  });
});