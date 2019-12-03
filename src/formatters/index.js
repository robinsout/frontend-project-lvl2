import diff from './diff';

const formattersMapping = {
    diff: (astObject) => diff(astObject),
};

export default (astObject, format) => (formattersMapping[format](astObject));
