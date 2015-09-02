# dev-util-cli
Command line to dev-util.

## Installation

Run the command:

```bash
$ npm install -g dev-util-cli
```

## Example:

### Generate three fake CPF with mask and copy to clipboard:

```bash
$ dev-util -f -C -m -q 3
```
Prints:
```bash
783.108.543-23
185.896.355-97
200.416.840-44
all text was copied to the clipboard
```

## Options:

By default, dev-util generate fake data to selected type.

### -f, --cpf:
Select CPF.

### -j, --cnpj:
Select CNPJ.

### -c, --creditCard &lt;type&gt;:
Select Credit Card.

Types: maestro, dinersclub, laser, jcb, unionpay, discover, mastercard, amex, visa

### -q, --quantity &lt;number&gt;:
Quantity of generate data.

### -m, --mask:
Generate data with default mask.

### -C, --clipboard:
Copy all generated data to clipboard.
