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
        if (keyWasRemoved) {
            const keyToAdd = {
                keyName: key,
                keyValue: oldValueIsObject ? '' : `${value}`,
                type: '-',
                children: oldValueIsObject ? [value] : [],
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
                keyValue: oldValueIsObject ? '' : `${value}`,
                type: '-',
                children: oldValueIsObject ? [value] : [],
            };
            const keyAfterToAdd = {
                keyName: key,
                keyValue: newValueIsObject ? '' : `${configAfter[key]}`,
                type: '+',
                children: !newValueIsObject ? [] : [configAfter[key]],
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

export const render = (comparedAst, result = ['{'], indent = 2) => {
    _.map(comparedAst, (obj) => {
        if (!Object.keys(obj).includes('children')) {
            const indentation = `${' '.repeat(indent + 2)}`;
            Object.getOwnPropertyNames(obj).forEach((key) => {
                result.push(`${indentation}${key}: ${obj[key]}`);
            });
            return result;
        }
        const indentation = `${' '.repeat(indent)}`;
        const braceOrValue = obj.children.length > 0 ? '{' : `${obj.keyValue}`;
        const type = obj.type === '' ? ' ' : obj.type;
        result.push(`${indentation}${type} ${obj.keyName}: ${braceOrValue}`);

        if (obj.children.length > 0) {
            return render(obj.children, result, indent + 4);
        }
        return result;
    });
    result.push(`${' '.repeat(indent - 2)}}`);
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
