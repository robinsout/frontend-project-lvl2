#!/usr/bin/env node

const program = require('commander');

const action = (firstConfig, secondConfig) => (`testTEST ${firstConfig} ${secondConfig}`);

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    action(firstConfig, secondConfig);
  });

program.parse(process.argv);

export default action;
