/* global describe, it */

'use strict';

const spawn = require('child_process').spawn;
const path = require('path');

const bin = path.join(__dirname, '../cli.js');
const regex = /Valid/;

const patterns = {
	cpf: /(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})/,
	cnpj: /(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})\-(\d{2})/,
	card: /(\d{4}\s\d{4}\s\d{4}\s\d{4})|(\d{4}\s\d{6}\s\d{5})/
};

function test(s, regex, done) {
	const t = regex.test(s);
	t.should.be.true();
	done();
}

describe('validate ', () => {
	it('CNPJ', done => {
		const s = spawn(bin, ['-j', '-v', '10.704.218/0001-80']);
		s.stdout.on('data', data => {
			test(data.toString('utf8', 4), regex, done);
		});
	});

	it('CPF', done => {
		const s = spawn(bin, ['-f', '-v', '260.711.928-62']);
		s.stdout.on('data', data => {
			test(data.toString('utf8', 4), regex, done);
		});
	});

	it('Credit Card', done => {
		const s = spawn(bin, ['-c', 'mastercard', '-v', '5242.7514.0951.2352']);
		s.stdout.on('data', data => {
			test(data.toString('utf8', 4), regex, done);
		});
	});
});

describe('generate ', () => {
	it('CPF', done => {
		const s = spawn(bin, ['-f', '-m']);
		s.stdout.on('data', data => {
			test(data.toString(), patterns.cpf, done);
		});
	});

	it('CNPJ', done => {
		const s = spawn(bin, ['-j', '-m']);
		s.stdout.on('data', data => {
			test(data.toString(), patterns.cnpj, done);
		});
	});

	it('Credit Card', done => {
		const s = spawn(bin, ['-c', 'mastercard', '-m']);
		s.stdout.on('data', data => {
			test(data.toString(), patterns.card, done);
		});
	});
});
