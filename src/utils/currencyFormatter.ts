
const formatCurrency = (value: number | string) => 
        new Intl.NumberFormat("en-In", {style: 'currency', currency: 'INR'}).format(value);

export default formatCurrency;