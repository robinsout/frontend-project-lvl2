import _ from 'lodash';

const render = (comparedAst, result = ['{'], indent = 2) => {
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

export default render;
