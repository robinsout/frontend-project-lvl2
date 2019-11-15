import genDiff from '../gendiff';

const fs = require('fs');

describe('tests', () => {
    const fixturesPath = `${__dirname}/__fixtures__/`;

    test('should compare json and return string result', () => {
        const resultPath = `${fixturesPath}result1.txt`;

        const result = fs.readFileSync(resultPath, 'utf8');
        expect(genDiff(`${fixturesPath}test1.json`, `${fixturesPath}test2.json`)).toEqual(result);
    });
    test('should compare yaml and return string result', () => {
        const resultPath = `${fixturesPath}result1.txt`;

        const result = fs.readFileSync(resultPath, 'utf8');
        expect(genDiff(`${fixturesPath}test1.yaml`, `${fixturesPath}test2.yaml`)).toEqual(result);
    });
});
