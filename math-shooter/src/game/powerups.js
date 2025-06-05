// This file manages power-up objects, including spawning, updating, and activating power-ups that the player can collect.

const POWERUP_TYPES = {
    ANSWER_BOMB: 'ANSWER_BOMB',
    SHIELD: 'SHIELD',
    SPARKLE_BOMB: 'SPARKLE_BOMB'
};

const POWERUP_DURATION_QUESTIONS = 3; // How many correct answers a powerup effect lasts (for Shield)

let powerups = [];

function spawnPowerup(canvasWidth) {
    if (powerups.length > 0) return; // Only one powerup at a time for now

    const powerupTypesArray = Object.values(POWERUP_TYPES);
    const type = powerupTypesArray[Math.floor(Math.random() * powerupTypesArray.length)];
    const powerupSize = 30;
    const powerupVy = (canvas.height + powerupSize) / 8; // Adjust speed as needed

    powerups.push({
        x: Math.random() * (canvasWidth - powerupSize - 20) + (powerupSize / 2) + 10,
        y: 0 - powerupSize / 2,
        width: powerupSize,
        height: powerupSize,
        vy: powerupVy,
        type: type,
        acquired: false,
        activeDuration: 0, // For shield, tracks questions correctly answered while active
        iconText: type === POWERUP_TYPES.ANSWER_BOMB ? 'B💣' : (type === POWERUP_TYPES.SHIELD ? 'S🛡️' : '✨')
    });
}

function updatePowerups() {
    for (let i = powerups.length - 1; i >= 0; i--) {
        const p = powerups[i];
        if (!p.acquired) {
            p.y += p.vy;
            if (p.y - p.height / 2 > canvas.height) {
                powerups.splice(i, 1); // Remove if off-screen
            }
        }
    }
}

function activatePowerup(powerup) {
    powerup.acquired = true;
    // Remove from active display list
    powerups = powerups.filter(p => p !== powerup); 

    if (powerup.type === POWERUP_TYPES.ANSWER_BOMB) {
        // Remove all wrong answers
        answers = answers.filter(ans => ans.correct);
        // Add explosion particles at wrong answer locations (visual flair)
    } else if (powerup.type === POWERUP_TYPES.SHIELD) {
        spaceship.shields = 2;
        updateShieldsDisplay();
        // Shield duration will be handled by `questionsAnsweredCorrectlyInLevel` elsewhere
    } else if (powerup.type === POWERUP_TYPES.SPARKLE_BOMB) {
        for (let i = 0; i < 100; i++) { // Create 100 sparkle particles
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                color: `rgba(255, 255, ${Math.floor(Math.random() * 155) + 100}, ${Math.random() * 0.5 + 0.5})`,
                life: 60 + Math.random() * 60, // Frames to live
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4
            });
        }
    }
}

export { spawnPowerup, updatePowerups, activatePowerup, POWERUP_TYPES };