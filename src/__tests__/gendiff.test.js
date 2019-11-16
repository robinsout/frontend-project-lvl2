import genDiff from '../gendiff';

const fs = require('fs');

describe('tests', () => {
    const fixturesPath = `${__dirname}/__fixtures__/`;
    const resultPath = `${fixturesPath}result1.txt`;
    const result = fs.readFileSync(resultPath, 'utf8');

    test.each([
        [`${fixturesPath}test1.json`, `${fixturesPath}test2.json`, result],
        [`${fixturesPath}test1.yaml`, `${fixturesPath}test2.yaml`, result],
        [`${fixturesPath}test1.ini`, `${fixturesPath}test2.ini`, result],
    ])('should compare\n%s\nwith\n%s\nand return string result', (configBefore, configAfter, expectedResult) => {
        expect(genDiff(configBefore, configAfter)).toEqual(expectedResult);
    });
});
