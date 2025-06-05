const GAME_STATE = {
    MENU: 'MENU',
    LEVEL_SELECT: 'LEVEL_SELECT',
    PLAYING: 'PLAYING',
    LEVEL_COMPLETE: 'LEVEL_COMPLETE',
    GAME_OVER: 'GAME_OVER'
};

let currentGameState = GAME_STATE.MENU;

function setGameState(newState) {
    currentGameState = newState;
}

function getCurrentGameState() {
    return currentGameState;
}

export { GAME_STATE, setGameState, getCurrentGameState };