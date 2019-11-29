import parseConfig from './parsers';

const _ = require('lodash');

export const compare = (configBefore, configAfter, result = []) => {
    _.each(configBefore, (value, key) => {
        const oldValueIsObject = typeof value === 'object';
        const newValueIsObject = typeof configAfter[key] === 'object';
        const keyWasRemoved = !_.has(configAfter, key);
        const valuesAreEqual = configBefore[key] === configAfter[key];

        if (!keyWasRemoved && oldValueIsObject && newValueIsObject) {
            const keyToAdd = {
                keyName: key,
                keyValue: '',
                type: ' ',
                children: [],
            };
            result.push(keyToAdd);
            return compare(value, configAfter[key], result[result.length - 1].children);
        }
        if (oldValueIsObject) {
            const keyToAdd = {
                keyName: key,
                keyValue: '',
                type: '-',
                children: [value],
            };
            return result.push(keyToAdd);
        }
        if (keyWasRemoved) {
            const keyToAdd = {
                keyName: key,
                keyValue: `${value}`,
                type: '-',
                children: [],
            };
            return result.push(keyToAdd);
        }
        if (valuesAreEqual) {
            const keyToAdd = {
                keyName: key,
                keyValue: `${value}`,
                type: ' ',
                children: [],
            };
            return result.push(keyToAdd);
        }
        if (!valuesAreEqual) {
            const keyBeforeToAdd = {
                keyName: key,
                keyValue: `${value}`,
                type: '-',
                children: [],
            };
            const keyAfterToAdd = {
                keyName: key,
                keyValue: newValueIsObject ? '' : `${configAfter[key]}`,
                type: '+',
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
            type: '+',
            children: typeof value === 'object' ? [value] : [],
        };
        result.push(keyToAdd);
    });
    return result;
};

export const render = (comparedAst, result = [], level = 1) => {
    _.map(comparedAst, (obj) => {
        const stringToAdd = `${' '.repeat(level * 2)}${obj.type} ${obj.keyName}: ${obj.keyValue}`;
        result.push(stringToAdd);
        console.log(stringToAdd);
    });
    result.unshift('{');
    result.push('}');
    return result.join('\n');
};

const action = (firstConfig, secondConfig) => {
    const configBefore = parseConfig(firstConfig);
    const configAfter = parseConfig(secondConfig);

    const comparedAst = compare(configBefore, configAfter);
    const result = render(comparedAst);
    return result;
};

export default action;
