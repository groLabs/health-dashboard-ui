import NumberFormat from 'react-number-format';

const Format = (rawValue: any, format: string) => {
    if (rawValue === 'NA')
        return 'NA';
    let value = parseFloat(rawValue);
    if (format === 'amount') {
        return <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
    } else if (format === 'percentage') {
        // avoid dust or extremely small variances
        if (Math.abs(value) < 0.0001)
            value = 0;
        return <NumberFormat value={value * 100} displayType={'text'} suffix={'%'} decimalScale={2} />
    }

}

export default Format;
