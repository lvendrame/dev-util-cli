#!/usr/bin/env node

'use strict';

const cpf = require('dev-util/docs/pt-br/cpf');
const cnpj = require('dev-util/docs/pt-br/cnpj');
const creditCard = require('dev-util/docs/creditCard');
const clipboard = require('to-clipboard');
const chalk = require('chalk');
const cli = require('./lib/commander');

const red = chalk.bold.red;
const green = chalk.bold.green;
const blue = chalk.bold.blue;

let cliParam;

function fail(v) {
	process.stdout.write(`${red('\u2716')} ${v}\n`);
	process.exit(1);
}

function success(v) {
	process.stdout.write(`${green('\u2713')} ${v}\n`);
	process.exit();
}

function info(v) {
	process.stdout.write(`${blue('\u2794')} ${v}\n`);
}

function getQuantity() {
	if (cli.quantity) {
		return cli.quantity;
	}
	return 1;
}

function getDocFunction() {
	if (cli.cpf) {
		return cpf;
	} else if (cli.cnpj) {
		return cnpj;
	} else if (cli.creditCard) {
		cliParam = cli.creditCard;
		return creditCard;
	}
}

function validateDoc(func) {
	const c = cli.validate.replace(/\D/g, '').replace(/^0+/, '');
	if (func.validate(c)) {
		success('Valid');
	} else {
		fail('Invalid');
	}
}

function generateDoc(func) {
	const str = [];
	let tmp;
	for (let i = 0, len = getQuantity(); i < len; i++) {
		tmp = cli.mask ? func.generateWithMask(cliParam) : func.generate(cliParam);
		info(tmp);
		str.push(tmp);
	}

	if (cli.clipboard) {
		clipboard(str.join('\r\n'), err => {
			if (err) {
				fail('Fail when copy text to the clipboard');
			} else {
				success('All text was copied to the clipboard');
			}
		});
	} else {
		process.exit();
	}
}

function validate() {
	validateDoc(getDocFunction());
}

function generate() {
	const docFunc = getDocFunction();
	if (docFunc) {
		generateDoc(docFunc);
	} else {
		fail('Select an document type');
	}
}

function execute() {
	if (cli.validate) {
		validate();
	} else {
		generate();
	}
}

if (cli.rawArgs.length < 3) {
	cli.help();
} else {
	execute();
}
