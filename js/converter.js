class ConverterController {
    constructor(calculator, animationController, particleSystem) {
        this.calculator = calculator;
        this.animations = animationController;
        this.particles = particleSystem;
        this.fromAmount = document.getElementById('fromAmount');
        this.toAmount = document.getElementById('toAmount');
        this.fromCode = 'USD';
        this.toCode = 'MXN';
        this.init();
    }

    init() {
        this.fromAmount.addEventListener('input', (e) => {
            this.handleConversion(e.target.value);
        });
        this.fromAmount.addEventListener('focus', () => {
            this.animations.flashElement(this.fromAmount.parentElement);
        });
    }

    handleConversion(value) {
        const amount = parseFloat(value);
        if (isNaN(amount) || amount <= 0) {
            this.toAmount.value = '';
            return;
        }

        const result = this.calculator.convert(amount, this.fromCode, this.toCode);
        const currentValue = parseFloat(this.toAmount.value) || 0;
        if (Math.abs(result.amount - currentValue) > 0.01) {
            this.animations.animateValue(this.toAmount, currentValue, result.amount);
            const rect = this.toAmount.getBoundingClientRect();
            this.particles.burst(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                6
            );
        }
        this.updateRateDisplay();
    }

    setFromCurrency(code) {
        this.fromCode = code;
        this.updateCurrencyDisplay('from', code);
        if (this.fromAmount.value) {
            this.handleConversion(this.fromAmount.value);
        }
    }

    setToCurrency(code) {
        this.toCode = code;
        this.updateCurrencyDisplay('to', code);
        if (this.fromAmount.value) {
            this.handleConversion(this.fromAmount.value);
        }
    }

    updateCurrencyDisplay(side, code) {
        const currency = this.calculator.currencyData.getCurrencyByCode(code);
        if (!currency) return;
        document.getElementById(`${side}Flag`).textContent = currency.flag;
        document.getElementById(`${side}Code`).textContent = currency.code;
        document.getElementById(`${side}Name`).textContent = currency.name;
    }

    swap() {
        const tempCode = this.fromCode;
        this.fromCode = this.toCode;
        this.toCode = tempCode;
        const tempValue = this.fromAmount.value;
        this.fromAmount.value = this.toAmount.value;
        this.toAmount.value = tempValue;
        this.updateCurrencyDisplay('from', this.fromCode);
        this.updateCurrencyDisplay('to', this.toCode);
        if (this.fromAmount.value) {
            this.handleConversion(this.fromAmount.value);
        }
        const rect = document.querySelector('.swap-btn').getBoundingClientRect();
        this.particles.burst(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            10
        );
    }

    updateRateDisplay() {
        const rateText = this.calculator.getExchangeRate(this.fromCode, this.toCode);
        document.getElementById('rateValue').textContent = rateText;
        const trend = this.calculator.calculateTrend(this.toCode);
        const trendElement = document.getElementById('rateTrend');
        const trendValue = trendElement.querySelector('.trend-value');
        const trendIcon = trendElement.querySelector('.trend-icon');
        trendValue.textContent = `${trend.isPositive ? '+' : '-'}${trend.percentage.toFixed(2)}%`;
        trendIcon.textContent = trend.isPositive ? '📈' : '📉';
        if (trend.isPositive) {
            trendElement.style.background = 'rgba(16, 185, 129, 0.1)';
            trendValue.style.color = 'var(--success)';
        } else {
            trendElement.style.background = 'rgba(239, 68, 68, 0.1)';
            trendValue.style.color = '#ef4444';
        }
    }

    refresh() {
        this.calculator.currencyData.updateRates();
        
        if (this.fromAmount.value) {
            this.handleConversion(this.fromAmount.value);
        }
        this.updateRateDisplay();
        this.particles.randomBurst();
    }
}
