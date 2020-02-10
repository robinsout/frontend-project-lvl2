import _ from 'lodash';
import parseConfig from './parsers';
import formatters from './formatters';

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
        type: 'unchanged',
        children: [],
      };
      result.push(keyToAdd);
      return compare(value, configAfter[key], result[result.length - 1].children);
    }
    if (keyWasRemoved) {
      const keyToAdd = {
        keyName: key,
        keyValue: oldValueIsObject ? '' : `${value}`,
        type: 'removed',
        children: oldValueIsObject ? [value] : [],
      };
      return result.push(keyToAdd);
    }
    if (valuesAreEqual) {
      const keyToAdd = {
        keyName: key,
        keyValue: `${value}`,
        type: 'unchanged',
        children: [],
      };
      return result.push(keyToAdd);
    }
    if (!valuesAreEqual) {
      const keyBeforeToAdd = {
        keyName: key,
        keyValue: oldValueIsObject ? '' : `${value}`,
        type: 'removed',
        children: oldValueIsObject ? [value] : [],
      };
      const keyAfterToAdd = {
        keyName: key,
        keyValue: newValueIsObject ? '' : `${configAfter[key]}`,
        type: 'added',
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
      type: 'added',
      children: typeof value === 'object' ? [value] : [],
    };
    result.push(keyToAdd);
  });
  return result;
};

export const action = (firstConfig, secondConfig, format = 'diff') => {
  const configBefore = parseConfig(firstConfig);
  const configAfter = parseConfig(secondConfig);
  const comparedAst = compare(configBefore, configAfter);
  const result = formatters(comparedAst, format);
  return result;
};

export default action;
