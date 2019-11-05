const program = require('commander');

program
  .name('gendiff')
  .version('0.0.1')
  .usage('gendiff [options] <firstConfig> <secondConfig>');

program.parse(process.argv);
