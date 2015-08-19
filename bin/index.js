#!/usr/bin/env node

var cpf = require('dev-util/docs/pt-br/cpf');
var cnpj = require('dev-util/docs/pt-br/cnpj');
var cli = require('./cli');
var copyPaste = require("copy-paste");

if(cli.validate){
	validate();
}else{
	generate();
}



function generate(){
    generateDoc(getDocFunction());
}

function generateDoc(func){
	var i = 0,
		len = getQuantity(),
        str = [],
        tmp;
	for(;i< len;i++){
        tmp = cli.mask?func.generateWithMask():func.generate();
		console.log(tmp);
        str.push(tmp);
	}
    
    if(cli.clipboard){
        copyPaste.copy(str.join("\r\n"));
        console.log("all text was copied to the clipboard");
    }
}

function validate(){
    validateDoc(getDocFunction());
}

function validateDoc(func){
    console.log(func.validate(cli.validate) ?
                'Valid document' :
                'Invalid document');
}

function getQuantity(){
	if(cli.quantity){
		return cli.quantity;
	}
	return 1;
}

function getDocFunction(){
	if(cli.cpf){
		return cpf;
	}else if(cli.cnpj){
		return cnpj;
	}else{
		return new function(){
			console.log('ERROR: Select an type');
		};
	}
}