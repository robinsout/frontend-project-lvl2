import parseConfig from './parsers';

const _ = require('lodash');

const validate = (configBefore, configAfter, result = []) => {
    _.each(configBefore, (value, key) => {
        const oldValueIsObject = typeof value === 'object';
        const newValueIsObject = typeof configAfter[key] === 'object';
        const keyWasRemoved = !_.has(configAfter, key);
        const valuesAreEqual = configBefore[key] === configAfter[key];

        if (!keyWasRemoved && oldValueIsObject && newValueIsObject) {
            const keyToAdd = {
                keyName: key,
                keyValue: '',
                type: '',
                children: [],
            };
            result.push(keyToAdd);
            return validate(value, configAfter[key], result[result.length - 1].children);
        }
        if (oldValueIsObject) {
            const keyToAdd = {
                keyName: key,
                keyValue: '',
                type: 'minus',
                children: [value],
            };
            return result.push(keyToAdd);
        }
        if (keyWasRemoved) {
            const keyToAdd = {
                keyName: key,
                keyValue: `${value}`,
                type: 'minus',
                children: [],
            };
            return result.push(keyToAdd);
        }
        if (valuesAreEqual) {
            const keyToAdd = {
                keyName: key,
                keyValue: `${value}`,
                type: '',
                children: [],
            };
            return result.push(keyToAdd);
        }
        if (!valuesAreEqual) {
            const keyBeforeToAdd = {
                keyName: key,
                keyValue: `${value}`,
                type: 'minus',
                children: [],
            };
            const keyAfterToAdd = {
                keyName: key,
                keyValue: newValueIsObject ? '' : `${configAfter[key]}`,
                type: 'plus',
                children: !newValueIsObject ? [] : configAfter[key],
            };
            result.push(keyBeforeToAdd);
            result.push(keyAfterToAdd);
            return result;
        }

        return result;
    });

    _.each(configAfter, (value, key) => {
        const keyWasAdded = !_.has(configBefore, key);

        if (!keyWasAdded) {
            return;
        }

        const keyToAdd = {
            keyName: key,
            keyValue: typeof value === 'object' ? '' : `${value}`,
            type: 'plus',
            children: typeof value === 'object' ? [value] : [],
        };
        result.push(keyToAdd);
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
