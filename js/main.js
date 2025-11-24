class MoneyCalculatorApp {
    constructor() {
        this.currencyData = null;
        this.calculator = null;
        this.particles = null;
        this.animations = null;
        this.modal = null;
        this.converter = null;
        this.ui = null;
        this.currentSelectingSide = null;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeComponents();
            this.setupEventListeners();
            this.startBackgroundEffects();
        });
    }

    initializeComponents() {
        this.currencyData = new CurrencyData();
        this.calculator = new RateCalculator(this.currencyData);
        this.particles = new ParticleSystem();
        this.animations = new AnimationController();
        this.modal = new CurrencyModal(this.currencyData);
        this.ui = new UIManager(this.currencyData);
        this.converter = new ConverterController(
            this.calculator,
            this.animations,
            this.particles
        );

        this.converter.updateRateDisplay();
    }

    setupEventListeners() {
        const swapBtn = document.getElementById('swapBtn');
        const refreshBtn = document.getElementById('refreshBtn');
        const fromCurrencyBtn = document.getElementById('fromCurrencyBtn');
        const toCurrencyBtn = document.getElementById('toCurrencyBtn');

        swapBtn.addEventListener('click', () => {
            this.handleSwap();
        });
        refreshBtn.addEventListener('click', () => {
            this.handleRefresh();
        });

        fromCurrencyBtn.addEventListener('click', () => {
            this.currentSelectingSide = 'from';
            this.modal.open((code) => {
                this.converter.setFromCurrency(code);
                this.animations.pulseElement(fromCurrencyBtn);
                this.ui.showNotification(`Moneda de origen: ${code}`);
            });
        });

        toCurrencyBtn.addEventListener('click', () => {
            this.currentSelectingSide = 'to';
            this.modal.open((code) => {
                this.converter.setToCurrency(code);
                this.animations.pulseElement(toCurrencyBtn);
                this.ui.showNotification(`Moneda de destino: ${code}`);
            });
        });

        document.addEventListener('currencyCardClick', (e) => {
            const code = e.detail.code;
            if (this.converter.toCode === code) {
                this.ui.showNotification('Ya seleccionaste esta moneda', 'error');
                return;
            }
            this.converter.setToCurrency(code);
            this.animations.pulseElement(toCurrencyBtn);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.activeElement.id === 'fromAmount') {
                document.getElementById('fromAmount').blur();
            }
        });
    }

    handleSwap() {
        const swapBtn = document.getElementById('swapBtn');
        this.animations.spinElement(swapBtn);
        setTimeout(() => {
            this.converter.swap();
            this.ui.showNotification('Monedas intercambiadas');
        }, 100);
    }

    handleRefresh() {
        const refreshBtn = document.getElementById('refreshBtn');
        const refreshIcon = refreshBtn.querySelector('.refresh-icon');
        this.animations.spinElement(refreshIcon, 800);
        setTimeout(() => {
            this.converter.refresh();
            this.ui.updateCurrencyGrid();
            this.ui.showNotification('Tasas actualizadas');
        }, 400);
    }

    startBackgroundEffects() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.particles.randomBurst();
            }
        }, 5000);
        this.addHoverEffects();
    }

    addHoverEffects() {
        const inputs = document.querySelectorAll('.amount-input');
        inputs.forEach(input => {
            input.addEventListener('mouseenter', () => {
                this.animations.pulseElement(input);
            });
        });

        const currencyBtns = document.querySelectorAll('.currency-select');
        currencyBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                const rect = btn.getBoundingClientRect();
                if (Math.random() > 0.7) {
                    this.particles.createParticle(
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2
                    );
                }
            });
        });
    }
}
new MoneyCalculatorApp();
