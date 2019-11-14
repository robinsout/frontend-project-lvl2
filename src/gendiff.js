const fs = require('fs');

export default (firstConfig, secondConfig) => {
  const configBefore = JSON.parse(fs.readFileSync(firstConfig));
  const configAfter = JSON.parse(fs.readFileSync(secondConfig));
  return { ...configBefore, ...configAfter };
};
