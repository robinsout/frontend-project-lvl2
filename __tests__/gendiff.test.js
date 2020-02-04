import fs from 'fs';
import genDiff from '../src';

const fixturesPath = `${__dirname}/__fixtures__/`;

const pathFactory = (fileName) => `${__dirname}/__fixtures__/nested/${fileName}`;

describe('compare configs', () => {
  const nestedStringResult = fs.readFileSync(`${fixturesPath}nested/result.txt`, 'utf8');
  const plainFormatResult = fs.readFileSync(`${fixturesPath}/plain.txt`, 'utf8');
  const jsonFormatResult = fs.readFileSync(`${fixturesPath}/string_json_result.txt`, 'utf8');

  test.each([
    [genDiff, pathFactory('test1.json'), pathFactory('test2.json'), nestedStringResult, 'diff'],
    [genDiff, pathFactory('test1.yaml'), pathFactory('test2.yaml'), nestedStringResult, 'diff'],
    [genDiff, pathFactory('test1.ini'), pathFactory('test2.ini'), nestedStringResult, 'diff'],
    [genDiff, pathFactory('test1.json'), pathFactory('test2.json'), plainFormatResult, 'plain'],
    [genDiff, pathFactory('test1.yaml'), pathFactory('test2.yaml'), plainFormatResult, 'plain'],
    [genDiff, pathFactory('test1.ini'), pathFactory('test2.ini'), plainFormatResult, 'plain'],
    [genDiff, pathFactory('test1.json'), pathFactory('test2.json'), jsonFormatResult, 'json'],
    [genDiff, pathFactory('test1.yaml'), pathFactory('test2.yaml'), jsonFormatResult, 'json'],
    [genDiff, pathFactory('test1.ini'), pathFactory('test2.ini'), jsonFormatResult, 'json'],
  ])('\nfunction: %s\n   file1:\n%s\n   file2:\n%s\n\n', (action, configBefore, configAfter, expectedResult, format) => {
    expect(action(configBefore, configAfter, format)).toEqual(expectedResult);
  });
});
