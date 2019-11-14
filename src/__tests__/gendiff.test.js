import genDiff from '../gendiff';

test('test', () => {
  expect(genDiff('1', '2')).toEqual('testTEST 1 2');
});
