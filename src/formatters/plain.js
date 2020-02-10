import _ from 'lodash';

const render = (comparedAst, result = [], parents = '') => {
  _.map(comparedAst, (obj) => {
    const propertyUnchanged = !obj.type;
    if (propertyUnchanged) {
      return result;
    }

    const currentPropertyIndex = _.indexOf(comparedAst, obj);
    const fullPropertyName = `${parents}${obj.keyName}`;

    const propertyWasUpdated = (
      currentPropertyIndex + 1 < comparedAst.length
      && comparedAst[currentPropertyIndex + 1].keyName === obj.keyName
    );

    const propertyWasRemoved = obj.type === 'removed';

    const propertyWasAdded = (
      obj.type === 'added'
      && comparedAst[currentPropertyIndex - 1].keyName !== obj.keyName
    );

    if (propertyWasUpdated) {
      const oldValue = `${obj.children.length > 0 ? '[complex value]' : `'${obj.keyValue}'`}`;
      const nextProperty = comparedAst[currentPropertyIndex + 1];
      const newValue = `${nextProperty.children.length > 0 ? '[complex value]' : `'${nextProperty.keyValue}'`}`;
      const stringToAdd = `Property '${fullPropertyName}' was updated. From ${oldValue} to ${newValue}`;
      return result.push(stringToAdd);
    }

    if (propertyWasRemoved) {
      const stringToAdd = `Property '${fullPropertyName}' was removed`;
      return result.push(stringToAdd);
    }

    if (propertyWasAdded) {
      const stringToAdd = `Property '${fullPropertyName}' was added with value: ${obj.children.length > 0 ? '[complex value]' : `'${obj.keyValue}'`}`;
      return result.push(stringToAdd);
    }

    if (obj.children && obj.children.length > 0) {
      return render(obj.children, result, `${fullPropertyName}.`);
    }
    return result;
  });
  return `${result.join('\n')}\n`;
};

export default render;
