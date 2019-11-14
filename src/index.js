#!/usr/bin/env node

import action from './gendiff';

const program = require('commander');

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
