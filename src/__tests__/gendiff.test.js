import * as genDiff from '../gendiff';
import parseConfig from '../parsers';
import formatDiff from '../formatters/diff';
import formatPlain from '../formatters/plain';

const fs = require('fs');

const fixturesPath = `${__dirname}/__fixtures__/`;

const compare = (configBefore, configAfter) => genDiff.compare(
    parseConfig(configBefore),
    parseConfig(configAfter),
);
const renderDiff = (configBefore, configAfter) => formatDiff(
    compare(configBefore, configAfter),
);
const renderPlain = (configBefore, configAfter) => formatDiff(
    compare(configBefore, configAfter),
);

describe('compare configs', () => {
    const flatResult = parseConfig(`${fixturesPath}flat/result_flat_ast.json`);
    const nestedResult = parseConfig(`${fixturesPath}nested/result_nested_ast.json`);

    const flatStringResult = fs.readFileSync(`${fixturesPath}flat/result.txt`, 'utf8');
    const nestedStringResult = fs.readFileSync(`${fixturesPath}nested/result.txt`, 'utf8');
    const plainFormatResult = fs.readFileSync(`${fixturesPath}/plain.txt`, 'utf8');

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
        // [compare, flatJsonBeforePath, flatJsonAfterPath, flatResult],
        // [compare, flatYamlBeforePath, flatYamlAfterPath, flatResult],
        // [compare, flatIniBeforePath, flatIniAfterPath, flatResult],
        // [compare, nestedJsonBeforePath, nestedJsonAfterPath, nestedResult],
        // [compare, nestedYamlBeforePath, nestedYamlAfterPath, nestedResult],
        // [compare, nestedIniBeforePath, nestedIniAfterPath, nestedResult],
        // [renderDiff, flatJsonBeforePath, flatJsonAfterPath, flatStringResult],
        // [renderDiff, flatYamlBeforePath, flatYamlAfterPath, flatStringResult],
        // [renderDiff, flatIniBeforePath, flatIniAfterPath, flatStringResult],
        // [renderDiff, nestedJsonBeforePath, nestedJsonAfterPath, nestedStringResult],
        // [renderDiff, nestedYamlBeforePath, nestedYamlAfterPath, nestedStringResult],
        // [renderDiff, nestedIniBeforePath, nestedIniAfterPath, nestedStringResult],
        // [renderDiff, nestedIniBeforePath, nestedIniAfterPath, nestedStringResult],
        [renderPlain, nestedJsonBeforePath, nestedJsonAfterPath, plainFormatResult],
    ])('\nfunction: %s\n   file1:\n%s\n   file2:\n%s\n\n', (action, configBefore, configAfter, expectedResult) => {
        expect(action(configBefore, configAfter)).toEqual(expectedResult);
    });
});
