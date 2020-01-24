import fs from 'fs';
import * as genDiff from '../src/gendiff';
import parseConfig from '../src/parsers';
import formatter from '../src/formatters';

const fixturesPath = `${__dirname}/__fixtures__/`;

const compare = (configBefore, configAfter) => genDiff.compare(
  parseConfig(configBefore),
  parseConfig(configAfter),
);
const render = (configBefore, configAfter, format) => formatter(
  compare(configBefore, configAfter), format,
);

describe('compare configs', () => {
  const nestedResult = parseConfig(`${fixturesPath}nested/result_nested_ast.json`);

  const nestedStringResult = fs.readFileSync(`${fixturesPath}nested/result.txt`, 'utf8');
  const plainFormatResult = fs.readFileSync(`${fixturesPath}/plain.txt`, 'utf8');
  const jsonFormatResult = fs.readFileSync(`${fixturesPath}/string_json_result.txt`, 'utf8');

  const nestedJsonBeforePath = `${fixturesPath}nested/test1.json`;
  const nestedJsonAfterPath = `${fixturesPath}nested/test2.json`;
  const nestedYamlBeforePath = `${fixturesPath}nested/test1.yaml`;
  const nestedYamlAfterPath = `${fixturesPath}nested/test2.yaml`;
  const nestedIniBeforePath = `${fixturesPath}nested/test1.ini`;
  const nestedIniAfterPath = `${fixturesPath}nested/test2.ini`;

  test.each([
    [compare, nestedJsonBeforePath, nestedJsonAfterPath, nestedResult, ''],
    [compare, nestedYamlBeforePath, nestedYamlAfterPath, nestedResult, ''],
    [compare, nestedIniBeforePath, nestedIniAfterPath, nestedResult, ''],
    [render, nestedJsonBeforePath, nestedJsonAfterPath, nestedStringResult, 'diff'],
    [render, nestedYamlBeforePath, nestedYamlAfterPath, nestedStringResult, 'diff'],
    [render, nestedIniBeforePath, nestedIniAfterPath, nestedStringResult, 'diff'],
    [render, nestedJsonBeforePath, nestedJsonAfterPath, plainFormatResult, 'plain'],
    [render, nestedYamlBeforePath, nestedYamlAfterPath, plainFormatResult, 'plain'],
    [render, nestedIniBeforePath, nestedIniAfterPath, plainFormatResult, 'plain'],
    [render, nestedJsonBeforePath, nestedJsonAfterPath, jsonFormatResult, 'json'],
    [render, nestedYamlBeforePath, nestedYamlAfterPath, jsonFormatResult, 'json'],
    [render, nestedIniBeforePath, nestedIniAfterPath, jsonFormatResult, 'json'],
  ])('\nfunction: %s\n   file1:\n%s\n   file2:\n%s\n\n', (action, configBefore, configAfter, expectedResult, format) => {
    expect(action(configBefore, configAfter, format)).toEqual(expectedResult);
  });
});
