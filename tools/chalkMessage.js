/*
    node does not recognize "import"
    so in prestart, use babel-node to compile this w/ babel
*/
import chalk from 'chalk';
//var chalk = require('chalk');
// eslint-disable-line no-console


console.log(chalk.green('Running EXPRESS server... ctrl-c to cancel'));
