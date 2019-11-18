import parseConfig from './parsers';

const _ = require('lodash');

const render = (firstConfig, secondConfig) => {
    const configBefore = parseConfig(firstConfig);
    const configAfter = parseConfig(secondConfig);

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

export default render;
