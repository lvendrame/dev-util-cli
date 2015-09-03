var program = require('commander');

program
    .description('Generate random documents, numbers, names, address, etc.')
    .version('0.0.1')
    .option('-f, --cpf', 'Select CPF')
    .option('-j, --cnpj', 'Select CNPJ')
    .option('-c, --creditCard <type>', 'Select Credit Card. Types: maestro, dinersclub, laser, jcb, unionpay, discover, mastercard, amex, visa')
    .option('-q, --quantity <number>', 'Quantity of generate data', parseInt)
    .option('-m, --mask', 'Add mask to')
    .option('-v, --validate <document>', 'Validate document')
    .option('-C, --clipboard', 'Copy text to clipboard')
    .parse(process.argv);

module.exports = program;
