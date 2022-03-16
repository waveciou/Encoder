export interface I_Parameter {
  digits: number;
  prime: number[];
  table: string[][];
  alphabet: string[];
  tableKeyword: string[];
}

export interface I_ParameterData {
  prime: number[];
  alphabet: string[];
  table: string[][];
}

export interface I_Loading {
  control: boolean;
  type: string
}