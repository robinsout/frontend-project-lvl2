#!/usr/bin/env node
import program from 'commander';
import compareConfigs from './gendiff';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.3')
  .option('-f, --format [type]', 'Output format', 'diff')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, options) => {
    console.log(compareConfigs(firstConfig, secondConfig, options.format));
  });

program.parse(process.argv);

export default compareConfigs;
