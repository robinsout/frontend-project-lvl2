const _ = require('lodash');

const render = (comparedAst, result = []) => {
    _.map(comparedAst, (obj) => {
        if (!Object.keys(obj).includes('children')) {
            Object.getOwnPropertyNames(obj).forEach((key) => {
                result.push(`${key}: ${obj[key]}`);
            });
            return result;
        }
        const braceOrValue = obj.children.length > 0 ? '{' : `${obj.keyValue}`;
        const type = obj.type === '' ? ' ' : obj.type;
        result.push(`${type} ${obj.keyName}: ${braceOrValue}`);

        if (obj.children.length > 0) {
            return render(obj.children, result);
        }
        return result;
    });
    return result.join('\n');
};

export default render;
