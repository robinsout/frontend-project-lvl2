import genDiff from '../gendiff';

test('test', () => {
  expect(genDiff('1', '2')).toEqual('test 1 2');
});
