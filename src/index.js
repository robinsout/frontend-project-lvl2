#!/usr/bin/env node

import compareConfigs from './gendiff';

export default compareConfigs;

const program = require('commander');

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.2')
    .option('-f, --format [type]', 'Output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
        console.log(compareConfigs(firstConfig, secondConfig));
    });

program.parse(process.argv);
