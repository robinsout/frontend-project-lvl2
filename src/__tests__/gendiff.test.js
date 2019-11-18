import genDiff from '../gendiff';

const fs = require('fs');

describe('flat configs', () => {
    const fixturesPath = `${__dirname}/__fixtures__/flat/`;
    const resultPath = `${fixturesPath}result.txt`;
    const result = fs.readFileSync(resultPath, 'utf8');

    test.each([
        [`${fixturesPath}test1.json`, `${fixturesPath}test2.json`, result],
        [`${fixturesPath}test1.yaml`, `${fixturesPath}test2.yaml`, result],
        [`${fixturesPath}test1.ini`, `${fixturesPath}test2.ini`, result],
    ])('should compare\n%s\n%s\nand return string result', (configBefore, configAfter, expectedResult) => {
        expect(genDiff(configBefore, configAfter)).toEqual(expectedResult);
    });
});

describe('nested configs', () => {
    const fixturesPath = `${__dirname}/__fixtures__/nested/`;
    const resultPath = `${fixturesPath}result.txt`;
    const result = fs.readFileSync(resultPath, 'utf8');

    test.each([
        [`${fixturesPath}test1.json`, `${fixturesPath}test2.json`, result],
        //        [`${fixturesPath}test1.yaml`, `${fixturesPath}test2.yaml`, result],
        //        [`${fixturesPath}test1.ini`, `${fixturesPath}test2.ini`, result],
    ])('should compare\n%s\n%s\nand return string result', (configBefore, configAfter, expectedResult) => {
        expect(genDiff(configBefore, configAfter)).toEqual(expectedResult);
    });
});
