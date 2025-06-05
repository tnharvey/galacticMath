// This file handles particle effects for visual flair, such as explosions or other effects that occur during gameplay.

const particles = [];

function createParticle(x, y, size, color, lifetime) {
    particles.push({
        x: x,
        y: y,
        size: size,
        color: color,
        lifetime: lifetime,
        age: 0,
        vx: (Math.random() - 0.5) * 2, // Random horizontal velocity
        vy: (Math.random() - 0.5) * 2  // Random vertical velocity
    });
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

function drawParticles() {
    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

export { createParticle, updateParticles, drawParticles };