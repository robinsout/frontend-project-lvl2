import diff from './diff';
import plain from './plain';
import json from './json';

const formattersMapping = {
    diff: (astObject) => diff(astObject),
    plain: (astObject) => plain(astObject),
    json: (astObject) => json(astObject),
};

export default (astObject, format) => (formattersMapping[format](astObject));
