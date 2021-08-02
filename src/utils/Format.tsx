import NumberFormat from 'react-number-format';

const sign = (value: number, dif: boolean) => (dif && value > 0) ? '+' : '';

export const Format = (rawValue: any, format: string, dif: boolean) => {
    try {
        if (rawValue === 'NA')
        return 'NA';
    let value = parseFloat(rawValue);
    if (format === 'amount') {
        return <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={sign(value, dif) + '$'} decimalScale={2} />
    } else if (format === 'percentage') {
        // avoid dust or extremely small variances
        if (Math.abs(value) < 0.0001)
            value = 0;
        return <NumberFormat value={value * 100} displayType={'text'} prefix={sign(value, dif)} suffix={'%'} decimalScale={2} />
    }
    } catch (err) {
        console.log('Error in Format.tsx:', err);
    }
}

export default Format;

