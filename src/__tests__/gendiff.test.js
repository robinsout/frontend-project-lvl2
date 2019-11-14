import genDiff from '../gendiff';

const fs = require('fs');

describe('tests', () => {
  test('should open files, parse json and return contents', () => {
    const filePath1 = `${__dirname}/__fixtures__/test1.json`;
    const filePath2 = `${__dirname}/__fixtures__/test2.json`;
    const resultPath = `${__dirname}/__fixtures__/result1.json`;

    const result = JSON.parse(fs.readFileSync(resultPath));
    expect(genDiff(filePath1, filePath2)).toEqual(result);
  });
});
