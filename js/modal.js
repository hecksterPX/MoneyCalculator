class CurrencyModal {
    constructor(currencyData) {
        this.currencyData = currencyData;
        this.modal = document.getElementById('currencyModal');
        this.currencyList = document.getElementById('currencyList');
        this.searchInput = document.getElementById('searchInput');
        this.closeBtn = document.getElementById('closeModal');
        this.currentCallback = null;
        this.init();
    }

    init() {
        this.closeBtn.addEventListener('click', () => this.close());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        this.searchInput.addEventListener('input', (e) => {
            this.filterCurrencies(e.target.value);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    open(callback) {
        this.currentCallback = callback;
        this.modal.classList.add('active');
        this.searchInput.value = '';
        this.renderCurrencies();
        setTimeout(() => this.searchInput.focus(), 100);
    }

    close() {
        this.modal.classList.remove('active');
        this.currentCallback = null;
    }

    renderCurrencies(filter = '') {
        const currencies = this.currencyData.getCurrencies();
        const filtered = filter 
            ? currencies.filter(c => 
                c.code.toLowerCase().includes(filter.toLowerCase()) ||
                c.name.toLowerCase().includes(filter.toLowerCase())
              ):currencies;
        this.currencyList.innerHTML = filtered.map(currency => `
            <div class="currency-item" data-code="${currency.code}">
                <span class="flag">${currency.flag}</span>
                <div class="currency-info">
                    <div class="code">${currency.code}</div>
                    <div class="name">${currency.name}</div>
                </div>
            </div>
        `).join('');
        this.currencyList.querySelectorAll('.currency-item').forEach(item => {
            item.addEventListener('click', () => {
                const code = item.dataset.code;
                if (this.currentCallback) {
                    this.currentCallback(code);
                }
                this.close();
            });
        });
    }

    filterCurrencies(query) {
        this.renderCurrencies(query);
    }
}
