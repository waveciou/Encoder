import setDefaultConfig from '@/Function/setDefaultConfig';

import data from '../data/parameter.json';

const configParam = setDefaultConfig(data, {
  alphabet: [],
  digits: 5,
  prime: [],
  table: [],
  tableKeyword: [],
});

export default configParam;
