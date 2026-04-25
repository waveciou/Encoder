interface IConfigParam {
  alphabet: string[];
  digits: number;
  prime: number[];
  table: string[][];
  tableKeyword: string[];
}

interface IParameter {
  alphabet: string[];
  prime: number[];
  table: string[][];
}

interface ILoading {
  control: boolean;
  type: '' | 'encode' | 'decode';
}

export type { IConfigParam, IParameter, ILoading };
