import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parseJson = (inputPath) => JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const parseYaml = (inputPath) => yaml.safeLoad(fs.readFileSync(inputPath, 'utf8'));
const parseIni = (inputPath) => ini.parse(fs.readFileSync(inputPath, 'utf8'));

const configMapping = {
  json: (inputPath) => parseJson(inputPath),
  yaml: (inputPath) => parseYaml(inputPath),
  yml: (inputPath) => parseYaml(inputPath),
  ini: (inputPath) => parseIni(inputPath),
};

export default (inputPath) => (configMapping[path.extname(inputPath).substr(1)](inputPath));
