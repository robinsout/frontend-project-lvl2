const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

export default (inputPath) => {
    switch (path.extname(inputPath)) {
    case '.json':
        return JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    case '.yml':
    case '.yaml':
        return yaml.safeLoad(fs.readFileSync(inputPath, 'utf8'));
    default:
        return 'unknown format';
    }
};
