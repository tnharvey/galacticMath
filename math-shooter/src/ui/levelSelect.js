// This file manages the level selection UI, allowing players to choose practice or core levels.

const levelSelectContainer = document.getElementById('levelSelectMenu');
const practiceLevelsContainer = document.getElementById('practiceLevelsContainer');
const coreLevelsContainer = document.getElementById('coreLevelsContainer');

function populateLevelSelectMenu() {
    practiceLevelsContainer.innerHTML = ''; 
    coreLevelsContainer.innerHTML = '';

    // Populate Practice Levels (1-12)
    for (let i = 1; i <= 12; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.addEventListener('click', () => {
            selectedLevelType = 'PRACTICE'; selectedLevelValue = i;
            setGameState(GAME_STATE.PLAYING);
        });
        practiceLevelsContainer.appendChild(btn);
    }

    // Populate Core Gameplay Levels
    const coreLevels = [
        { name: "Apprentice Blaster", type: 'APPRENTICE' },
        { name: "Journeyman Blaster", type: 'JOURNEYMAN' },
        { name: "Master Blaster", type: 'MASTER' }
    ];
    coreLevels.forEach(level => {
        const btn = document.createElement('button');
        btn.textContent = level.name;
        btn.classList.add('core-level-button');
        btn.addEventListener('click', () => {
            selectedLevelType = level.type; selectedLevelValue = null; // Value not needed for core types
            setGameState(GAME_STATE.PLAYING);
        });
        coreLevelsContainer.appendChild(btn);
    });
}

export { populateLevelSelectMenu };