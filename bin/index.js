#!/usr/bin/env node

var cpf = require('dev-util/docs/pt-br/cpf');
var cnpj = require('dev-util/docs/pt-br/cnpj');
var cli = require('./cli');
//console.log(devUtil.generate());

if(cli.validate){
	validate();
}else{
	generate();
}



function generate(){
	switch(cli.doc){
		case 'CPF':
		case 'cpf':
			generateCPF();
			break;
		case 'CNPJ':
		case 'cnpj':
			generateCNPJ();
			break;
	}
}

function generateCPF(){
	var i = 0,
		len = getQuantity();
	for(;i< len;i++){
		console.log(cli.mask?cpf.generateWithMask():cpf.generate());
	}
}

function generateCNPJ(){
	var i = 0,
		len = getQuantity();
	for(;i< len;i++){
		console.log(cli.mask?cnpj.generateWithMask():cnpj.generate());
	}
}

function validate(){
	console.log('ainda não implentado.')
}

function getQuantity(){
	if(cli.quantity){
		return cli.quantity;
	}
	return 0;
}