module.exports = function (defaultData, stateParam) {
  const result = {};

  Object.keys(stateParam).forEach(key => {
    result[key] = defaultData[key] || stateParam[key];
  });

  result.tableKeyword = [...result.alphabet];

  for (let i = 0; i < 10; i++) {
    result.tableKeyword.push(`${i}`);
  }

  return result;
};