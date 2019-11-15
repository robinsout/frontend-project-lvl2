const fs = require('fs');
const _ = require('lodash');

export default (firstConfig, secondConfig) => {
    const configBefore = JSON.parse(fs.readFileSync(firstConfig));
    const configAfter = JSON.parse(fs.readFileSync(secondConfig));
    //  const result = { ...configBefore, ...configAfter };

    const result = ['{'];

    _.each(configBefore, (value, key) => {
        if (!_.has(configAfter, key)) {
            result.push(`\n  - ${key}: ${value}`);
        } else if (configBefore[key] !== configAfter[key]) {
            result.push(`\n  - ${key}: ${configBefore[key]}`);
            result.push(`\n  + ${key}: ${configAfter[key]}`);
        } else {
            result.push(`\n    ${key}: ${value}`);
        }
    });

    _.each(configAfter, (value, key) => {
        if (!_.has(configBefore, key)) {
            result.push(`\n  + ${key}: ${value}`);
        }
    });
    result.push('\n}');

    return result.join('');
};
