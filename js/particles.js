class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particleContainer');
        this.particles = ['💵', '💶', '💷', '💸', '🪙', '💰', '💎', '🤑', '💹', '💴'];
    }
    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = this.particles[Math.floor(Math.random() * this.particles.length)];
        const tx = (Math.random() - 0.5) * 200;
        const ty = -150 - Math.random() * 100;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        this.container.appendChild(particle);
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
    burst(x, y, count = 5) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createParticle(x, y);
            }, i * 50);
        }
    } 
    randomBurst() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        this.burst(x, y, 5);
    }
}
