// This file defines the spaceship object, including its properties (position, speed, shields) and methods for movement and drawing.

const spaceship = {
    x: 0,
    y: 0,
    width: 40,
    height: 30,
    dx: 0,
    acceleration: 0.5,
    maxSpeed: 7,
    friction: 0.92,
    color: '#00ffff',
    engineColor1: '#ff4400',
    engineColor2: '#ffff00',
    shields: 0,
    isInvincible: false,
    invincibilityTimer: 0,

    move: function(left, right) {
        if (left) this.dx -= this.acceleration;
        if (right) this.dx += this.acceleration;
        this.dx *= this.friction;
        if (Math.abs(this.dx) < 0.1) this.dx = 0;
        this.x += this.dx;
        if (this.x < this.width / 2) this.x = this.width / 2;
        if (this.x > canvas.width - this.width / 2) this.x = canvas.width - this.width / 2;
    },

    draw: function(ctx) {
        if (this.isInvincible && Math.floor(Date.now() / 100) % 2 === 0) {
            return; // Don't draw if invincible and flashing
        }
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.width / 2, this.y + this.height);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        const engineGlowHeight = 10 + Math.random() * 5;
        ctx.fillStyle = this.engineColor1;
        ctx.fillRect(this.x - 4, this.y + this.height, 8, engineGlowHeight);
        ctx.fillStyle = this.engineColor2;
        ctx.fillRect(this.x - 2, this.y + this.height, 4, engineGlowHeight - 2);
    }
};

export default spaceship;