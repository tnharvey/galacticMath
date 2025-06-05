// This file manages enemy behavior, including spawning enemies, updating their positions, and handling collisions with the player.

const enemies = [];

function spawnEnemies(levelType) {
    enemies.length = 0; // Clear existing enemies
    const enemyCount = levelType === 'APPRENTICE' ? 1 : levelType === 'JOURNEYMAN' ? 2 : 3;

    for (let i = 0; i < enemyCount; i++) {
        const enemy = {
            x: Math.random() * (canvas.width - 40) + 20,
            y: -30, // Start above the canvas
            width: 40,
            height: 30,
            vy: (Math.random() * 2 + 1), // Random speed
            health: 1,
            color: '#FF6347' // Tomato red
        };
        enemies.push(enemy);
    }
}

function updateEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.y += enemy.vy;

        if (enemy.y > canvas.height + enemy.height) {
            enemies.splice(i, 1); // Remove if off-screen
        }
    }
}

function drawEnemies(ctx) {
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function checkEnemyCollisions(spaceship) {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        if (checkOverlap(enemy, spaceship)) {
            enemies.splice(i, 1); // Remove enemy on collision
            return true; // Collision detected
        }
    }
    return false; // No collision
}

export { spawnEnemies, updateEnemies, drawEnemies, checkEnemyCollisions };