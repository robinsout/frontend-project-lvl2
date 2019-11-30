import * as genDiff from '../gendiff';
import parseConfig from '../parsers';

const fs = require('fs');


describe('check flat AST', () => {
    const flatFixturesPath = `${__dirname}/__fixtures__/flat/`;
    const astResultPath = `${flatFixturesPath}result_flat_ast.json`;
    const flatResultAst = parseConfig(astResultPath);

    test.each([
        [`${flatFixturesPath}test1.json`, `${flatFixturesPath}test2.json`, flatResultAst],
        [`${flatFixturesPath}test1.yaml`, `${flatFixturesPath}test2.yaml`, flatResultAst],
        [`${flatFixturesPath}test1.ini`, `${flatFixturesPath}test2.ini`, flatResultAst],
    ])('should compare\n%s\n%s\nand return flat AST result', (configBefore, configAfter, expectedResult) => {
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

describe('check nested AST', () => {
    const nestedFixturesPath = `${__dirname}/__fixtures__/nested/`;
    const astResultPath = `${nestedFixturesPath}result_nested_ast.json`;
    const nestedResultAst = parseConfig(astResultPath);

    test.each([
        [`${nestedFixturesPath}test1.json`, `${nestedFixturesPath}test2.json`, nestedResultAst],
        [`${nestedFixturesPath}test1.yaml`, `${nestedFixturesPath}test2.yaml`, nestedResultAst],
        [`${nestedFixturesPath}test1.ini`, `${nestedFixturesPath}test2.ini`, nestedResultAst],
    ])('should compare\n%s\n%s\nand return nested AST result', (configBefore, configAfter, expectedResult) => {
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
    const fixturesPath = `${__dirname}/__fixtures__/flat/`;
    const resultPath = `${fixturesPath}result.txt`;
    const result = fs.readFileSync(resultPath, 'utf8');

    test.each([
        [`${fixturesPath}test1.json`, `${fixturesPath}test2.json`, result],
        // [`${fixturesPath}test1.yaml`, `${fixturesPath}test2.yaml`, result],
        // [`${fixturesPath}test1.ini`, `${fixturesPath}test2.ini`, result],
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

describe('nested configs', () => {
    const fixturesPath = `${__dirname}/__fixtures__/nested/`;
    const resultPath = `${fixturesPath}result.txt`;
    const result = fs.readFileSync(resultPath, 'utf8');

    test.each([
        [`${fixturesPath}test1.json`, `${fixturesPath}test2.json`, result],
        //        [`${fixturesPath}test1.yaml`, `${fixturesPath}test2.yaml`, result],
        //        [`${fixturesPath}test1.ini`, `${fixturesPath}test2.ini`, result],
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
