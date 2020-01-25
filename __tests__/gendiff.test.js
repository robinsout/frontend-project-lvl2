import fs from 'fs';
import genDiff from '../src';

const fixturesPath = `${__dirname}/__fixtures__/`;

describe('compare configs', () => {
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
    [genDiff, nestedJsonBeforePath, nestedJsonAfterPath, nestedStringResult, 'diff'],
    [genDiff, nestedYamlBeforePath, nestedYamlAfterPath, nestedStringResult, 'diff'],
    [genDiff, nestedIniBeforePath, nestedIniAfterPath, nestedStringResult, 'diff'],
    [genDiff, nestedJsonBeforePath, nestedJsonAfterPath, plainFormatResult, 'plain'],
    [genDiff, nestedYamlBeforePath, nestedYamlAfterPath, plainFormatResult, 'plain'],
    [genDiff, nestedIniBeforePath, nestedIniAfterPath, plainFormatResult, 'plain'],
    [genDiff, nestedJsonBeforePath, nestedJsonAfterPath, jsonFormatResult, 'json'],
    [genDiff, nestedYamlBeforePath, nestedYamlAfterPath, jsonFormatResult, 'json'],
    [genDiff, nestedIniBeforePath, nestedIniAfterPath, jsonFormatResult, 'json'],
  ])('\nfunction: %s\n   file1:\n%s\n   file2:\n%s\n\n', (action, configBefore, configAfter, expectedResult, format) => {
    expect(action(configBefore, configAfter, format)).toEqual(expectedResult);
  });
});
