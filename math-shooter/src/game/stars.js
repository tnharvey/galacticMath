// This file manages the background stars, including their positions and animations.

const stars = [];
const numStars = 150;

function initializeStars(canvasWidth, canvasHeight) {
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
}

function updateStars(canvasHeight) {
    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvasHeight + star.size) {
            star.y = -star.size;
            star.x = Math.random() * canvasWidth;
        }
    });
}

function drawStars(ctx) {
    stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

export { initializeStars, updateStars, drawStars };