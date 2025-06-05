// This file serves as the entry point for the JavaScript application. 
// It initializes the game, sets up event listeners, and starts the game loop.

import { setGameState, GAME_STATE } from './game/gameState.js';
import { gameLoop } from './game/gameLoop.js';
import { setupEventListeners } from './ui/events.js';
import { populateLevelSelectMenu } from './ui/levelSelect.js';

window.onload = () => {
    populateLevelSelectMenu();
    setupEventListeners();
    setGameState(GAME_STATE.MENU);
    gameLoop();
};