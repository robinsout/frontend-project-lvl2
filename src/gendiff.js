import parseConfig from './parsers';

const _ = require('lodash');

// const render = (configBefore, configAfter, result) => {
//     _.each(configBefore, (value, key) => {
//         if (typeof value === 'object' && _.has(configAfter, key)) {
//             console.log(key, ':', value);
//             return render(value, configAfter[key], result);
//         }
//         if (!_.has(configAfter, key)) {
//             result.push(`\n  - ${key}: ${value}`);
//         } else if (configBefore[key] !== configAfter[key]) {
//             result.push(`\n  - ${key}: ${configBefore[key]}`);
//             result.push(`\n  + ${key}: ${configAfter[key]}`);
//         } else {
//             result.push(`\n    ${key}: ${value}`);
//         }
//     });

//     _.each(configAfter, (value, key) => {
//         if (!_.has(configBefore, key)) {
//             result.push(`\n  + ${key}: ${value}`);
//         }
//     });
//     result.push('\n}');
//     return result;
// };

const validate = (configBefore, configAfter, result = { diff: [] }) => {
    _.each(configBefore, (value, key) => {
        // console.log(key, ':', value);
        if (typeof value === 'object' && _.has(configAfter, key)) {
            return validate(value, configAfter[key], result);
        }
        if (!_.has(configAfter, key)) {
            const keyToAdd = {
                type: 'key',
                body: {
                    [key]: `${value}`,
                },
                status: 'minus',
            };
            result.diff.push(keyToAdd);
        } else if (configBefore[key] !== configAfter[key]) {
            const keyBeforeToAdd = {
                type: 'key',
                body: {
                    [key]: `${value}`,
                },
                status: 'minus',
            };
            const keyAfterToAdd = {
                type: 'key',
                body: {
                    [key]: `${configAfter[key]}`,
                },
                status: 'plus',
            };
            result.diff.push(keyBeforeToAdd);
            result.diff.push(keyAfterToAdd);
        } else {
            const keyToAdd = {
                type: 'key',
                body: {
                    [key]: `${value}`,
                },
            };
            result.diff.push(keyToAdd);
        }
    });

    _.each(configAfter, (value, key) => {
        if (!_.has(configBefore, key)) {
            const keyAfterToAdd = {
                type: 'key',
                body: {
                    [key]: `${configAfter[key]}`,
                },
                status: 'plus',
            };
            result.diff.push(keyAfterToAdd);
        }
    });
    return result;
};

const action = (firstConfig, secondConfig) => {
    const configBefore = parseConfig(firstConfig);
    const configAfter = parseConfig(secondConfig);

    return validate(configBefore, configAfter);
};

export default action;
