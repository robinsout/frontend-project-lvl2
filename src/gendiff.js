import parseConfig from './parsers';

const _ = require('lodash');

const validate = (configBefore, configAfter, result = []) => {
    _.each(configBefore, (value, key) => {
        if (_.has(configAfter, key) && typeof value === 'object' && typeof configAfter[key] === 'object') {
            const keyToAdd = {
                keyName: key,
                keyValue: '',
                type: '',
                children: [],
            };
            result.push(keyToAdd);
            return validate(value, configAfter[key], result[result.length - 1].children);
        }
        if (typeof value === 'object') {
            const keyToAdd = {
                keyName: key,
                keyValue: '',
                type: 'minus',
                children: [value],
            };
            return result.push(keyToAdd);
        }
        if (!_.has(configAfter, key)) {
            const keyToAdd = {
                keyName: key,
                keyValue: value,
                type: 'minus',
                children: [],
            };
            return result.push(keyToAdd);
        }
        if (configBefore[key] !== configAfter[key]) {
            const keyBeforeToAdd = {
                keyName: key,
                keyValue: value,
                type: 'minus',
                children: [],
            };
            const keyAfterToAdd = {
                keyName: key,
                keyValue: typeof configAfter[key] === 'object' ? '' : configAfter[key],
                type: 'plus',
                children: typeof configAfter[key] !== 'object' ? [] : configAfter[key],
            };
            result.push(keyBeforeToAdd);
            result.push(keyAfterToAdd);
            return result;
        }
        if (configBefore[key] === configAfter[key]) {
            const keyToAdd = {
                keyName: key,
                keyValue: value,
                type: '',
                children: [],
            };
            return result.push(keyToAdd);
        }
    });

    _.each(configAfter, (value, key) => {
        if (!_.has(configBefore, key) && typeof value === 'object') {
            const keyToAdd = {
                keyName: key,
                keyValue: '',
                type: 'plus',
                children: [value],
            };
            return result.push(keyToAdd);
        }
        if (!_.has(configBefore, key)) {
            const keyToAdd = {
                keyName: key,
                keyValue: value,
                type: 'plus',
                children: [],
            };
            return result.push(keyToAdd);
        }
    });

    return result;
};

const action = (firstConfig, secondConfig) => {
    const configBefore = parseConfig(firstConfig);
    const configAfter = parseConfig(secondConfig);

    const result = validate(configBefore, configAfter);
    console.log(JSON.stringify(result));
    return result;
};

export default action;
