import * as genDiff from '../gendiff';
import parseConfig from '../parsers';

const fs = require('fs');

const fixturesPath = `${__dirname}/__fixtures__/`;

const compare = (configBefore, configAfter) => genDiff.compare(
    parseConfig(configBefore),
    parseConfig(configAfter),
);
const render = (configBefore, configAfter) => genDiff.render(
    compare(configBefore, configAfter),
);

describe('check AST', () => {
    const flatResult = parseConfig(`${fixturesPath}flat/result_flat_ast.json`);
    const nestedResult = parseConfig(`${fixturesPath}nested/result_nested_ast.json`);

    const flatStringResult = fs.readFileSync(`${fixturesPath}flat/result.txt`, 'utf8');
    const nestedStringResult = fs.readFileSync(`${fixturesPath}nested/result.txt`, 'utf8');

    const flatJsonBeforePath = `${fixturesPath}flat/test1.json`;
    const flatJsonAfterPath = `${fixturesPath}flat/test2.json`;
    const flatYamlBeforePath = `${fixturesPath}flat/test1.yaml`;
    const flatYamlAfterPath = `${fixturesPath}flat/test2.yaml`;
    const flatIniBeforePath = `${fixturesPath}flat/test1.ini`;
    const flatIniAfterPath = `${fixturesPath}flat/test2.ini`;

    const nestedJsonBeforePath = `${fixturesPath}nested/test1.json`;
    const nestedJsonAfterPath = `${fixturesPath}nested/test2.json`;
    const nestedYamlBeforePath = `${fixturesPath}nested/test1.yaml`;
    const nestedYamlAfterPath = `${fixturesPath}nested/test2.yaml`;
    const nestedIniBeforePath = `${fixturesPath}nested/test1.ini`;
    const nestedIniAfterPath = `${fixturesPath}nested/test2.ini`;

    test.each([
        [compare, flatJsonBeforePath, flatJsonAfterPath, flatResult],
        [compare, flatYamlBeforePath, flatYamlAfterPath, flatResult],
        [compare, flatIniBeforePath, flatIniAfterPath, flatResult],
        [compare, nestedJsonBeforePath, nestedJsonAfterPath, nestedResult],
        [compare, nestedYamlBeforePath, nestedYamlAfterPath, nestedResult],
        [compare, nestedIniBeforePath, nestedIniAfterPath, nestedResult],
        [render, flatJsonBeforePath, flatJsonAfterPath, flatStringResult],
        [render, flatYamlBeforePath, flatYamlAfterPath, flatStringResult],
        [render, flatIniBeforePath, flatIniAfterPath, flatStringResult],
        [render, nestedJsonBeforePath, nestedJsonAfterPath, nestedStringResult],
        [render, nestedYamlBeforePath, nestedYamlAfterPath, nestedStringResult],
        [render, nestedIniBeforePath, nestedIniAfterPath, nestedStringResult],
    ])('\nfunction: %s\n   file1:\n%s\n   file2:\n%s\n\n', (action, configBefore, configAfter, expectedResult) => {
        expect(action(configBefore, configAfter)).toEqual(expectedResult);
    });
});
