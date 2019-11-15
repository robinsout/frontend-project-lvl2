import genDiff from '../gendiff';

const fs = require('fs');

describe('tests', () => {
    test('should compare json and return string result', () => {
        const filePath1 = `${__dirname}/__fixtures__/test1.json`;
        const filePath2 = `${__dirname}/__fixtures__/test2.json`;
        const resultPath = `${__dirname}/__fixtures__/result1.txt`;

        const result = fs.readFileSync(resultPath, 'utf8');
        expect(genDiff(filePath1, filePath2)).toEqual(result);
    });
});
