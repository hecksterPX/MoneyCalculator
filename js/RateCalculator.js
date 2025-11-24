class RateCalculator {
    constructor(currencyData) {
        this.currencyData = currencyData;
    }
    convert(amount, fromCode, toCode) {
        if (isNaN(amount) || amount < 0) {
            return {
                amount: 0,
                formatted: '0.00',
                rate: 0
            };
        }

        const fromRate = this.currencyData.getCurrentRate(fromCode);
        const toRate = this.currencyData.getCurrentRate(toCode);
        const amountInUSD = amount / fromRate;
        const convertedAmount = amountInUSD * toRate;
        const rate = toRate / fromRate;
        return {
            amount: convertedAmount,
            formatted: this.formatAmount(convertedAmount),
            rate: rate
        };
    }

    getExchangeRate(fromCode, toCode) {
        const fromRate = this.currencyData.getCurrentRate(fromCode);
        const toRate = this.currencyData.getCurrentRate(toCode);
        const rate = toRate / fromRate;
        return `1 ${fromCode} = ${this.formatAmount(rate)} ${toCode}`;
    }

    formatAmount(amount) {
        if (amount >= 1000) {
            return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return amount.toFixed(2);
    }

    formatCurrency(amount, currencyCode) {
        const currency = this.currencyData.getCurrencyByCode(currencyCode);
        if (!currency) return amount.toFixed(2);
        const formatted = this.formatAmount(amount);
        return `${currency.symbol}${formatted}`;
    }

    calculateTrend(code) {
        const change = this.currencyData.getRateChange(code);
        return {
            percentage: Math.abs(change),
            isPositive: change >= 0
        };
    }
}
