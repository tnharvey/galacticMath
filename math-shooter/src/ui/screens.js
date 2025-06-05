// This file handles the different screens in the game (e.g., game over, level complete) and their transitions.

const screens = {
    menu: document.getElementById('mainMenu'),
    levelSelect: document.getElementById('levelSelectMenu'),
    levelComplete: document.getElementById('levelCompleteScreen'),
    gameOver: document.getElementById('gameOverScreen'),
};

function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.style.display = 'none';
    });
    screens[screenName].style.display = 'flex';
}

function updateLevelCompleteScreen(score) {
    const finalScoreCompleteEl = document.getElementById('finalScoreComplete');
    finalScoreCompleteEl.textContent = `Your Score: ${score}`;
}

function updateGameOverScreen(score) {
    const finalScoreGameOverEl = document.getElementById('finalScoreGameOver');
    finalScoreGameOverEl.textContent = `Your Score: ${score}`;
}

export { showScreen, updateLevelCompleteScreen, updateGameOverScreen };