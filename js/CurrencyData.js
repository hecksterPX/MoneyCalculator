class CurrencyData {
    constructor() {
        this.currencies = [
            { code: 'USD', name: 'Dólar Estadounidense', flag: '🇺🇸', symbol: '$', baseRate: 1 },
            { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€', baseRate: 0.92 },
            { code: 'GBP', name: 'Libra Esterlina', flag: '🇬🇧', symbol: '£', baseRate: 0.79 },
            { code: 'JPY', name: 'Yen Japonés', flag: '🇯🇵', symbol: '¥', baseRate: 149.82 },
            { code: 'MXN', name: 'Peso Mexicano', flag: '🇲🇽', symbol: '$', baseRate: 17.35 },
            { code: 'CAD', name: 'Dólar Canadiense', flag: '🇨🇦', symbol: '$', baseRate: 1.36 },
            { code: 'AUD', name: 'Dólar Australiano', flag: '🇦🇺', symbol: '$', baseRate: 1.52 },
            { code: 'CHF', name: 'Franco Suizo', flag: '🇨🇭', symbol: 'Fr', baseRate: 0.88 },
            { code: 'CNY', name: 'Yuan Chino', flag: '🇨🇳', symbol: '¥', baseRate: 7.24 },
            { code: 'BRL', name: 'Real Brasileño', flag: '🇧🇷', symbol: 'R$', baseRate: 4.98 },
            { code: 'ARS', name: 'Peso Argentino', flag: '🇦🇷', symbol: '$', baseRate: 350.50 },
            { code: 'COP', name: 'Peso Colombiano', flag: '🇨🇴', symbol: '$', baseRate: 3950.00 },
            { code: 'CLP', name: 'Peso Chileno', flag: '🇨🇱', symbol: '$', baseRate: 890.50 },
            { code: 'PEN', name: 'Sol Peruano', flag: '🇵🇪', symbol: 'S/', baseRate: 3.75 },
            { code: 'INR', name: 'Rupia India', flag: '🇮🇳', symbol: '₹', baseRate: 83.12 },
            { code: 'KRW', name: 'Won Surcoreano', flag: '🇰🇷', symbol: '₩', baseRate: 1320.50 }
        ];

        this.baseRates = {};
        this.currentRates = {};
        this.currencies.forEach(currency => {
            this.baseRates[currency.code] = currency.baseRate;
        });
        this.initializeRates();
    }

    initializeRates() {
        this.currencies.forEach(currency => {
            const variance = 0.98 + Math.random() * 0.04;
            this.currentRates[currency.code] = this.baseRates[currency.code] * variance;
        });
    }

    getCurrencies() {
        return this.currencies;
    }

    getCurrencyByCode(code) {
        return this.currencies.find(c => c.code === code);
    }

    getCurrentRate(code) {
        return this.currentRates[code] || 1;
    }

    updateRates() {
        this.currencies.forEach(currency => {
            const variance = 0.98 + Math.random() * 0.04;
            this.currentRates[currency.code] = this.baseRates[currency.code] * variance;
        });
    }

    getRateChange(code) {
        const current = this.currentRates[code];
        const base = this.baseRates[code];
        return ((current - base) / base) * 100;
    }
}
