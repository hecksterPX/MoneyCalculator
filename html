class AnimationController {
    constructor() {
        this.animationFrames = new Map();
    }
    animateValue(element, start, end, duration = 400) {
        if (this.animationFrames.has(element)) {
            cancelAnimationFrame(this.animationFrames.get(element));
        }
        const startTime = performance.now();
        const range = end - start;
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed/duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = start + (range * easeOutQuart);
            element.value = current.toFixed(2);
            
            if (progress < 1) {
                const frameId = requestAnimationFrame(animate);
                this.animationFrames.set(element, frameId);
            } else {
                this.animationFrames.delete(element);
            }
        };
        
        const frameId = requestAnimationFrame(animate);
        this.animationFrames.set(element, frameId);
    }
    pulseElement(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'pulse 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 10);
    }
    shakeElement(element) {
        element.style.animation = 'shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
    flashElement(element, color = 'var(--primary)') {
        const originalBg = element.style.background;
        element.style.transition = 'background 0.3s ease';
        element.style.background = `${color}20`;
        setTimeout(() => {
            element.style.background = originalBg;
        }, 300);
    }
    spinElement(element, duration = 600) {
        element.style.transition = `transform ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
        element.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            element.style.transform = 'rotate(0deg)';
        }, duration);
    }
}
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {transform: scale(1);}
        50% {transform: scale(1.05);}
    }
    @keyframes shake {
        0%, 100% {transform: translateX(0);}
        10%, 30%, 50%, 70%, 90% {transform: translateX(-5px);}
        20%, 40%, 60%, 80% {transform: translateX(5px);}
    }
`;
document.head.appendChild(style);
