const fs = require('fs');

export default (firstConfig, secondConfig) => {
  const configBefore = JSON.parse(fs.readFileSync(firstConfig));
  const configAfter = JSON.parse(fs.readFileSync(secondConfig));
  const result = { ...configBefore, ...configAfter };
  console.log(result);
  return result;
};
