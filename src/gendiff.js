import parseConfig from './parsers';

const _ = require('lodash');

const render = (configBefore, configAfter, result) => {
    _.each(configBefore, (value, key) => {
        if (typeof value === 'object' && _.has(configAfter, key)) {
            console.log(key, ':', value);
            return render(value, configAfter[key], result);
        }
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
    return result;
};

const action = (firstConfig, secondConfig) => {
    const configBefore = parseConfig(firstConfig);
    const configAfter = parseConfig(secondConfig);

    const result = ['{'];

    return render(configBefore, configAfter, result).join('');
};

export default action;
