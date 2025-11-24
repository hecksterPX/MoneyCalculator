class UIManager {
    constructor(currencyData) {
        this.currencyData = currencyData;
        this.currencyGrid = document.getElementById('currencyGrid');
        this.init();
    }

    init() {
        this.renderCurrencyGrid();
        this.addScrollAnimations();
    }

    renderCurrencyGrid() {
        const currencies = this.currencyData.getCurrencies();
        const featured = currencies.slice(0, 8);
        this.currencyGrid.innerHTML = featured.map((currency, index) => {
            const rate = this.currencyData.getCurrentRate(currency.code);
            return `
                <div class="currency-card" data-code="${currency.code}" style="animation-delay: ${index * 0.1}s">
                    <span class="flag">${currency.flag}</span>
                    <span class="code">${currency.code}</span>
                    <span class="rate">${rate.toFixed(2)}</span>
                </div>
            `;
        }).join('');

        this.currencyGrid.querySelectorAll('.currency-card').forEach(card => {
            card.addEventListener('click', () => {
                const code = card.dataset.code;
                this.handleCurrencyCardClick(code);
            });
        });
    }

    handleCurrencyCardClick(code) {
        const event = new CustomEvent('currencyCardClick', { detail: { code } });
        document.dispatchEvent(event);
    }

    updateCurrencyGrid() {
        const cards = this.currencyGrid.querySelectorAll('.currency-card');
        cards.forEach(card => {
            const code = card.dataset.code;
            const rate = this.currencyData.getCurrentRate(code);
            const rateElement = card.querySelector('.rate');
            rateElement.style.transition = 'transform 0.3s ease';
            rateElement.style.transform = 'scale(1.2)';
            rateElement.textContent = rate.toFixed(2);
            setTimeout(() => {
                rateElement.style.transform = 'scale(1)';
            }, 300);
        });
    }

    addScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.currency-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success)' : 'var(--accent)'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            font-weight: 500;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            z-index: 2000;
            animation: slideInRight 0.3s ease-out;`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {opacity: 1; transform: translateX(0);}}
    @keyframes slideOutRight {
        from {opacity: 1; transform: translateX(0);
        }
        to {opacity: 0;transform: translateX(100px);}}
`; document.head.appendChild(notificationStyle);
