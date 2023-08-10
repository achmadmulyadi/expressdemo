module.exports = function parseFilter(filter) {
    var str = '';
    var nonArrCounter = 0;
    var lastOperand = '';
    var operand = '';
    var valueCompare = '';
    filter.forEach(function (item) {
        if (Array.isArray(item)) {
            nonArrCounter = 0;
            str = str + '(' + parseFilter(item) + ') ';
        } else {
            nonArrCounter++;
            switch (nonArrCounter) {
                case 1:
                    str = str + (item == 'or' || item == 'and' ? item : item == '!' ? 'not' : `LOWER(${item})`) + ' ';
                    break;
                case 2:
                    lastOperand = item;
                    if (item == 'contains')
                        operand = 'LIKE';
                    else if (item == 'notcontains')
                        operand = 'NOT LIKE';
                    else if (item == 'startswith')
                        operand = 'LIKE';
                    else if (item == 'endswith')
                        operand = 'LIKE';

                    else
                        operand = item;
                    str = str + operand + ' ';
                    break;
                case 3:
                    if (lastOperand == 'contains')
                        valueCompare = `'%${item.toLowerCase()}%'`;
                    else if (lastOperand == 'notcontains')
                        valueCompare = `'%${item.toLowerCase()}%'`;
                    else if (lastOperand == 'startswith')
                        valueCompare = `'${item.toLowerCase()}%'`;
                    else if (lastOperand == 'endswith')
                        valueCompare = `'%${item.toLowerCase()}'`;
                    else if (item === null) {
                        str = str.substring(0, str.length - 3);
                        if (operand == '=')
                            valueCompare = ' IS NULL';

                        else
                            valueCompare = ' IS NOT NULL';
                    }
                    else if(item===true)
                    {
                        valueCompare = '1';
                    }
                    else if(item===false)
                    {
                        valueCompare = '0';
                    }
                    else
                        valueCompare = `LOWER('${item}')`;
                    str = str + valueCompare;
                    break;
            }

        }
    });
    //console.log(str);

    return str;
}

