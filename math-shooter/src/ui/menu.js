// This file manages the main menu UI, including displaying the menu and handling user interactions.

const menuScreen = document.getElementById('mainMenu');
const selectLevelBtn = document.getElementById('selectLevelBtn');
const settingsBtn = document.getElementById('settingsBtn');

function showMenu() {
    menuScreen.style.display = 'flex';
}

function hideMenu() {
    menuScreen.style.display = 'none';
}

function setupMenuEventListeners() {
    selectLevelBtn.addEventListener('click', () => {
        hideMenu();
        setGameState(GAME_STATE.LEVEL_SELECT);
    });

    settingsBtn.addEventListener('click', () => {
        alert('Settings: Coming Soon!');
    });
}

export { showMenu, hideMenu, setupMenuEventListeners };