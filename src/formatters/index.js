import diff from './diff';
import plain from './plain';

const formattersMapping = {
    diff: (astObject) => diff(astObject),
    plain: (astObject) => plain(astObject),
};

export default (astObject, format) => (formattersMapping[format](astObject));
