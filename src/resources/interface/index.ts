export interface I_ConfigParam {
  alphabet: string[];
  digits: number;
  prime: number[];
  table: string[][];
  tableKeyword: string[];
}

export interface I_Parameter {
  alphabet: string[];
  prime: number[];
  table: string[][];
}

export interface I_Loading {
  control: boolean;
  type: '' | 'encode' | 'decode';
}
