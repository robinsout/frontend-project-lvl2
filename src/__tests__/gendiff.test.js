import * as genDiff from '../gendiff';
import parseConfig from '../parsers';

const fs = require('fs');

const fixturesPath = `${__dirname}/__fixtures__/`;

describe('check AST', () => {
    const flatResult = parseConfig(`${fixturesPath}flat/result_flat_ast.json`);
    const nestedResult = parseConfig(`${fixturesPath}nested/result_nested_ast.json`);

    test.each([
        [`${fixturesPath}flat/test1.json`, `${fixturesPath}flat/test2.json`, flatResult],
        [`${fixturesPath}flat/test1.yaml`, `${fixturesPath}flat/test2.yaml`, flatResult],
        [`${fixturesPath}flat/test1.ini`, `${fixturesPath}flat/test2.ini`, flatResult],
        [`${fixturesPath}nested/test1.json`, `${fixturesPath}nested/test2.json`, nestedResult],
        [`${fixturesPath}nested/test1.yaml`, `${fixturesPath}nested/test2.yaml`, nestedResult],
        [`${fixturesPath}nested/test1.ini`, `${fixturesPath}nested/test2.ini`, nestedResult],
    ])('should compare\n%s\n%s\nand return AST result', (configBefore, configAfter, expectedResult) => {
        expect(
            genDiff.compare(
                parseConfig(configBefore),
                parseConfig(configAfter),
            ),
        )
            .toEqual(
                expectedResult,
            );
    });
});

describe('flat configs', () => {
    const flatResult = fs.readFileSync(`${fixturesPath}flat/result.txt`, 'utf8');
    const nestedResult = fs.readFileSync(`${fixturesPath}nested/result.txt`, 'utf8');

    test.each([
        [`${fixturesPath}flat/test1.json`, `${fixturesPath}flat/test2.json`, flatResult],
        [`${fixturesPath}flat/test1.yaml`, `${fixturesPath}flat/test2.yaml`, flatResult],
        [`${fixturesPath}flat/test1.ini`, `${fixturesPath}flat/test2.ini`, flatResult],
        [`${fixturesPath}nested/test1.json`, `${fixturesPath}nested/test2.json`, nestedResult],
        [`${fixturesPath}nested/test1.yaml`, `${fixturesPath}nested/test2.yaml`, nestedResult],
        [`${fixturesPath}nested/test1.ini`, `${fixturesPath}nested/test2.ini`, nestedResult],
    ])('should compare\n%s\n%s\nand return string result', (configBefore, configAfter, expectedResult) => {
        expect(
            genDiff.render(
                genDiff.compare(
                    parseConfig(configBefore),
                    parseConfig(configAfter),
                ),
            ),
        ).toEqual(expectedResult);
    });
});
