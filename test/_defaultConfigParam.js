const setDefaultParam = require('../src/resources/js/function/setDefaultParam');
const data = require('../src/resources/data/parameter.json');

module.exports = setDefaultParam(data, {
  digits: 5,
  prime: [],
  table: [],
  alphabet: [],
  tableKeyword: []
});