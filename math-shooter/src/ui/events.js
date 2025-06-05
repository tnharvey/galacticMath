// This file manages event listeners for user interactions, such as keyboard and mouse events.

const keys = {};
let mouseX = 0;
let mouseActive = false;
const canvas = document.getElementById('gameCanvas');

function setupEventListeners() {
    document.addEventListener('keydown', (e) => {
        keys[e.code] = true;
        if (e.code === 'Space') {
            e.preventDefault();
            shoot();
        }
    });

    document.addEventListener('keyup', (e) => {
        keys[e.code] = false;
    });

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseActive = true;
    });

    canvas.addEventListener('click', () => {
        shoot();
    });

    window.addEventListener('resize', resizeCanvas);
}

function shoot() {
    if (currentGameState !== GAME_STATE.PLAYING) return;
    bullets.push({ x: spaceship.x, y: spaceship.y, radius: 4, speed: 10, color: '#ffff00' });
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    spaceship.y = canvas.height - 80; 
    if (currentGameState === GAME_STATE.PLAYING) {
            spaceship.x = canvas.width / 2; 
            spaceship.dx = 0; 
            generateProblem(); 
    }
    stars.length = 0;
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5, speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
}

export { setupEventListeners };