import genDiff from '../gendiff';

const fs = require('fs');

describe('tests', () => {
    const fixturesPath = `${__dirname}/__fixtures__/`;

    test('should compare json and return string result', () => {
        const filePath1 = `${fixturesPath}test1.json`;
        const filePath2 = `${fixturesPath}test2.json`;
        const resultPath = `${fixturesPath}result1.txt`;

        const result = fs.readFileSync(resultPath, 'utf8');
        expect(genDiff(filePath1, filePath2)).toEqual(result);
    });
    test('should compare yaml and return string result', () => {
        const filePath1 = `${fixturesPath}test1.yaml`;
        const filePath2 = `${fixturesPath}test2.yaml`;
        const resultPath = `${fixturesPath}result1.txt`;

        const result = fs.readFileSync(resultPath, 'utf8');
        expect(genDiff(filePath1, filePath2)).toEqual(result);
    });
});
