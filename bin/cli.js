var program = require('commander');
 
program
    .description('Generate random documents, numbers, names, address, etc.')
    .version('0.0.1')
    .option('-f, --cpf', 'Select CPF')
    .option('-j, --cnpj', 'Select CNPJ')
    .option('-n, --name [gender]', 'Select Name')
    .option('-c, --creditCard', 'Select Credit Card')
    .option('-q, --quantity <number>', 'Quantity to generate', parseInt)
    .option('-m, --mask', 'Add mask to')
    .option('-v, --validate <document>', 'Validate document')
    .option('-C, --clipboard', 'Copy text to clipboard')
    .parse(process.argv);
  
module.exports = program;