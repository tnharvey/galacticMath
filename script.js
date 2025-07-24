// DOM Elements
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const gameUiContainer = document.getElementById('gameUiContainer');
        const problemEl = document.getElementById('problem');
        const scoreEl = document.getElementById('score'); 
        const shieldsDisplayEl = document.getElementById('shieldsDisplay');

        const mainMenuScreen = document.getElementById('mainMenu');
        const levelSelectScreen = document.getElementById('levelSelectMenu');
        const practiceLevelsContainer = document.getElementById('practiceLevelsContainer');
        const coreLevelsContainer = document.getElementById('coreLevelsContainer');
        const levelCompleteScreen = document.getElementById('levelCompleteScreen');
        const levelCompleteTitle = document.getElementById('levelCompleteTitle');
        const gameOverScreen = document.getElementById('gameOverScreen');
        const gameOverTitle = document.getElementById('gameOverTitle');
        const pauseMenuScreen = document.getElementById('pauseMenuScreen'); 
        const reportingMenuScreen = document.getElementById('reportingMenuScreen');
        const heatmapReportScreen = document.getElementById('heatmapReportScreen');
        const heatmapContainer = document.getElementById('heatmapContainer');
        const settingsScreen = document.getElementById('settingsScreen'); 
        const confirmationModal = document.getElementById('confirmationModal'); 
        const confirmationMessageText = document.getElementById('confirmationMessageText'); 
        const clearHistoryStatusEl = document.getElementById('clearHistoryStatus'); 

        // Journey UI Element References
        const journeyIntroScreen = document.getElementById('journeyIntroScreen');
        const beginTrainingBtn = document.getElementById('beginTrainingBtn');
        const learningMapScreen = document.getElementById('learningMapScreen');
        const learningMapTitle = document.getElementById('learningMapTitle');
        const mapContainer = document.getElementById('mapContainer');
        const nextPhaseBtn = document.getElementById('nextPhaseBtn');
        const instructionScreen = document.getElementById('instructionScreen');
        const instructionTitle = document.getElementById('instructionTitle');
        const instructionText = document.getElementById('instructionText');
        const instructionContinueBtn = document.getElementById('instructionContinueBtn');
        const backToMainMenuFromMapBtn = document.getElementById('backToMainMenuFromMapBtn');
        const finalChallengeScreen = document.getElementById('finalChallengeScreen');
        const challengeHeatmapContainer = document.getElementById('challengeHeatmapContainer');
        const beginFinalChallengeBtn = document.getElementById('beginFinalChallengeBtn');
        const challengeReturnToMapBtn = document.getElementById('challengeReturnToMapBtn');
        const skipToMultBtn = document.getElementById('skipToMultBtn');
        const unlockMissionsBtn = document.getElementById('unlockMissionsBtn');
        const devFillGridBtn = document.getElementById('devFillGridBtn');
        const waveAlertModal = document.getElementById('waveAlertModal');
        const continueWaveBtn = document.getElementById('continueWaveBtn');
        const graduationScreen = document.getElementById('graduationScreen');
        const graduationContinueBtn = document.getElementById('graduationContinueBtn');

        const startJourneyBtn = document.getElementById('startJourneyBtn');
        const selectLevelBtn = document.getElementById('selectLevelBtn');
        const reportingBtn = document.getElementById('reportingBtn'); 
        const mainMenuSettingsBtn = document.getElementById('mainMenuSettingsBtn');
        const backToMainMenuBtnLvl = document.getElementById('backToMainMenuBtnLvl');
        const nextLevelBtn = document.getElementById('nextLevelBtn');
        const mainMenuFromCompleteBtn = document.getElementById('mainMenuFromCompleteBtn');
        const tryAgainBtn = document.getElementById('tryAgainBtn');
        const mainMenuFromGameOverBtn = document.getElementById('mainMenuFromGameOverBtn');
        
        const pauseGameBtn = document.getElementById('pauseGameBtn'); 
        const resumeGameBtn = document.getElementById('resumeGameBtn'); 
        const pauseMenuSettingsBtn = document.getElementById('pauseMenuSettingsBtn'); 
        const exitToMainMenuBtn = document.getElementById('exitToMainMenuBtn'); 
        
        const overallPerformanceBtn = document.getElementById('overallPerformanceBtn');
        const backToMainMenuFromReportingBtn = document.getElementById('backToMainMenuFromReportingBtn');
        const backToReportingMenuBtn = document.getElementById('backToReportingMenuBtn');
        const clearHistoryBtn = document.getElementById('clearHistoryBtn'); 
        const confirmClearBtn = document.getElementById('confirmClearBtn'); 
        const cancelClearBtn = document.getElementById('cancelClearBtn'); 
        const backToMainMenuFromSettingsBtn = document.getElementById('backToMainMenuFromSettingsBtn'); 
        
        const finalScoreCompleteEl = document.getElementById('finalScoreComplete');
        const finalScoreGameOverEl = document.getElementById('finalScoreGameOver');

        // Game Journey Data
        const gameJourney = [
          // Phase 1: Addition
          { id: 'p1_t1_i', phase: 'addition', type: 'instruction', topic: 'Adding One', title: 'Training: Adding One', instructions: 'Adding 1 to any number is simply finding the next number in the sequence. For example, 3 + 1 is 4. Ready to practice?' },
          { id: 'p1_t1_p', phase: 'addition', type: 'practice', topic: 'Adding One', problemSet: 'add_plus_one', config: { winCondition: { type: 'correctAnswers', value: 5 } } },
          { id: 'p1_t1_r', phase: 'addition', type: 'report', topic: 'Adding One', title: 'Training Analysis: Adding One' },
          { id: 'p1_t2_i', phase: 'addition', type: 'instruction', topic: 'Doubles', title: 'Training: Doubles', instructions: 'Doubling a number means adding it to itself. For example, 4 + 4 = 8. This is a key skill!' },
          { id: 'p1_t2_p', phase: 'addition', type: 'practice', topic: 'Doubles', problemSet: 'add_doubles', config: { winCondition: { type: 'correctAnswers', value: 5 } } },
          { id: 'p1_t2_r', phase: 'addition', type: 'report', topic: 'Doubles', title: 'Training Analysis: Doubles' },
          { id: 'p1_t3_i', phase: 'addition', type: 'instruction', topic: 'Making 10', title: 'Training: Making 10', instructions: 'Knowing which numbers add up to 10 is a critical shortcut! (1+9, 2+8, 3+7...). Let\'s practice finding the missing piece.' },
          { id: 'p1_t3_p', phase: 'addition', type: 'practice', topic: 'Making 10', problemSet: 'add_making_10', config: { winCondition: { type: 'correctAnswers', value: 7 } } },
          { id: 'p1_t3_r', phase: 'addition', type: 'report', topic: 'Making 10', title: 'Training Analysis: Making 10' },
          // Phase 2: Multiplication
          { id: 'p2_t0_i', phase: 'multiplication', type: 'instruction', topic: 'Intro to Multiplication', title: 'Advanced Training: Multiplication', instructions: 'Multiplication is just repeated addition. For example, 3 × 4 is the same as 4 + 4 + 4. Let\'s start with the basics.' },
          { id: 'p2_t1_i', phase: 'multiplication', type: 'instruction', topic: 'Multiplying by 0 & 1', title: 'Strategy: The Easy Ones!', instructions: 'Anything times 0 is 0. Anything times 1 is itself. These are free points, Cadet!' },
          { id: 'p2_t1_p', phase: 'multiplication', type: 'practice', topic: 'Multiplying by 0 & 1', problemSet: 'mult_by_zero_one', config: { winCondition: { type: 'correctAnswers', value: 6 } } },
          { id: 'p2_t1_r', phase: 'multiplication', type: 'report', topic: 'Multiplying by 0 & 1', title: 'Analysis: x0 and x1' },
          { id: 'p2_t2_i', phase: 'multiplication', type: 'instruction', topic: 'Multiplying by 2 (Doubles)', title: 'Strategy: Doubles!', instructions: 'Just like in addition, multiplying by 2 is the same as doubling the number. You already know this!' },
          { id: 'p2_t2_p', phase: 'multiplication', type: 'practice', topic: 'Multiplying by 2 (Doubles)', problemSet: 'mult_by_two', config: { winCondition: { type: 'correctAnswers', value: 6 } } },
          { id: 'p2_t2_r', phase: 'multiplication', type: 'report', topic: 'Multiplying by 2 (Doubles)', title: 'Analysis: x2' },
          { id: 'p2_t3_i', phase: 'multiplication', type: 'instruction', topic: 'Multiplying by 10', title: 'Strategy: The 10s Trick', instructions: 'When multiplying by 10, just add a zero to the end of the other number. Example: 10 × 4 becomes 4 with a zero, which is 40!' },
          { id: 'p2_t3_p', phase: 'multiplication', type: 'practice', topic: 'Multiplying by 10', problemSet: 'mult_by_ten', config: { winCondition: { type: 'correctAnswers', value: 6 } } },
          { id: 'p2_t3_r', phase: 'multiplication', type: 'report', topic: 'Multiplying by 10', title: 'Analysis: x10' },
          { id: 'p2_t4_i', phase: 'multiplication', type: 'instruction', topic: 'Commutative Property', title: 'Strategy: The Order Doesn\'t Matter!', instructions: 'The order of numbers doesn\'t change the answer in multiplication. 3 × 7 is the same as 7 × 3. This trick cuts the facts you need to learn in half!' },
          { id: 'p2_t4_p', phase: 'multiplication', type: 'practice', topic: 'Commutative Property', problemSet: 'mult_commutative', config: { winCondition: { type: 'correctAnswers', value: 8 } } },
          { id: 'p2_t4_r', phase: 'multiplication', type: 'report', topic: 'Commutative Property', title: 'Analysis: Commutative Property' },
          { id: 'p2_t5_i', phase: 'multiplication', type: 'instruction', topic: 'Multiplying by 5 (Evens)', title: 'Strategy: The 5s Trick (Even Numbers)', instructions: 'When multiplying 5 by an EVEN number (2, 4, 6...), just take half of that number and add a zero. Example: 5 × 8... Half of 8 is 4... add a zero to get 40!' },
          { id: 'p2_t5_p', phase: 'multiplication', type: 'practice', topic: 'Multiplying by 5 (Evens)', problemSet: 'mult_by_five_evens', config: { winCondition: { type: 'correctAnswers', value: 6 } } },
          { id: 'p2_t5_r', phase: 'multiplication', type: 'report', topic: 'Multiplying by 5 (Evens)', title: 'Analysis: x5 (Evens)' },
          { id: 'p2_t6_i', phase: 'multiplication', type: 'instruction', topic: 'Multiplying by 5 (Odds)', title: 'Strategy: The 5s Trick (Odd Numbers)', instructions: 'For ODD numbers (1, 3, 7...), the trick is similar. Take the number *before* it, cut that in half, and add a 5. Example: 5 × 9... The number before 9 is 8... Half of 8 is 4... add a 5 to get 45!' },
          { id: 'p2_t6_p', phase: 'multiplication', type: 'practice', topic: 'Multiplying by 5 (Odds)', problemSet: 'mult_by_five_odds', config: { winCondition: { type: 'correctAnswers', value: 6 } } },
          { id: 'p2_t6_r', phase: 'multiplication', type: 'report', topic: 'Multiplying by 5 (Odds)', title: 'Analysis: x5 (Odds)' },
          { id: 'p2_t7_i', phase: 'multiplication', type: 'instruction', topic: 'Multiplying by 3 & 4', title: 'Strategy: Skip Counting', instructions: 'Multiplying by 3 and by 4 is straightforward if you remember your skip counting. For 3s: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30. For 4s: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40.' },
          { id: 'p2_t7_p', phase: 'multiplication', type: 'practice', topic: 'Multiplying by 3 & 4', problemSet: 'mult_by_three_four', config: { winCondition: { type: 'correctAnswers', value: 8 } } },
          { id: 'p2_t7_r', phase: 'multiplication', type: 'report', topic: 'Multiplying by 3 & 4', title: 'Analysis: x3 and x4' },
          { id: 'p2_t8_p', phase: 'multiplication', type: 'practice', topic: 'Multiplying by Squares', problemSet: 'mult_squares', config: { winCondition: { type: 'correctAnswers', value: 8 } } },
          { id: 'p2_t8_r', phase: 'multiplication', type: 'report', topic: 'Multiplying by Squares', title: 'Analysis: Squares' },
          { id: 'p2_t9_p', phase: 'multiplication', type: 'practice', topic: 'Multiplying by 9', problemSet: 'mult_by_nine', config: { winCondition: { type: 'correctAnswers', value: 8 } } },
          { id: 'p2_t9_r', phase: 'multiplication', type: 'report', topic: 'Multiplying by 9', title: 'Analysis: x9' },
          { id: 'p2_t10_p', phase: 'multiplication', type: 'practice', topic: 'Multiplying by 6, 7 & 8', problemSet: 'mult_by_six_seven_eight', config: { winCondition: { type: 'correctAnswers', value: 10 } } },
          { id: 'p2_t10_r', phase: 'multiplication', type: 'report', topic: 'Multiplying by 6, 7 & 8', title: 'Analysis: x6, x7, x8' },
          { id: 'p2_t11_p', phase: 'multiplication', type: 'practice', topic: 'Multiplying by 11 & 12', problemSet: 'mult_by_eleven_twelve', config: { winCondition: { type: 'correctAnswers', value: 10 } } },
          { id: 'p2_t11_r', phase: 'multiplication', type: 'report', topic: 'Multiplying by 11 & 12', title: 'Analysis: x11 and x12' },
          // Final Challenge
          { id: 'final_challenge', phase: 'multiplication', type: 'final_challenge', topic: 'Final Proficiency Test' }
        ];

        let playerProgressIndex = 0;
        let currentPhase = 'addition';
        let currentNodeData = {};
        let missionsUnlocked = false; // DEV TOOL
        let masteryProblemSet = []; // For the final challenge
        let sessionMastery = {}; // Tracks mastery within a single final challenge session
        let finalChallengeWaveEvent = false;
        let waveEventTriggered = false;
        let waveEnemiesActive = false;
        let correctAnswertShotInWave = false;
        let touchStartTime = 0;
        let touchStartX = 0;
        let touchStartY = 0;
        let movementTouchId = null;

        // Game States
        const GAME_STATE = {
            MENU: 'MENU', LEVEL_SELECT: 'LEVEL_SELECT', PLAYING: 'PLAYING',
            LEVEL_COMPLETE: 'LEVEL_COMPLETE', GAME_OVER: 'GAME_OVER', PAUSED: 'PAUSED',
            REPORTING_MENU: 'REPORTING_MENU', HEATMAP_REPORT: 'HEATMAP_REPORT', SETTINGS: 'SETTINGS',
            JOURNEY_INTRO: 'JOURNEY_INTRO', LEARNING_MAP: 'LEARNING_MAP', INSTRUCTION: 'INSTRUCTION',
            FINAL_CHALLENGE: 'FINAL_CHALLENGE', WAVE_ALERT: 'WAVE_ALERT', GRADUATION: 'GRADUATION'
        };
        
        let currentGameState = GAME_STATE.MENU;
        let previousGameState = GAME_STATE.MENU; 
        let selectedLevelType = null; 
        let selectedLevelValue = null;

        // Performance Tracking
        let levelProblemStats = {}; 
        let overallPlayerStats = {}; 
        const PLAYER_STATS_KEY = 'spaceMathBlasterOverallStats';
        const PLAYER_PROGRESS_KEY = 'spaceMathBlasterPlayerProgress';

        // Sprite Manager (Unchanged)
        const spriteManager = {
            spriteSheetImage: null, isLoaded: false, isLoading: false,
            spriteData: { 
                spaceship:      { sX: 4,   sY: 4,   sWidth: 80,  sHeight: 60,  dWidth: 80,  dHeight: 60  },
                playerBullet:   { sX: 88,  sY: 4,   sWidth: 20,  sHeight: 20,  dWidth: 20,  dHeight: 20  },
                enemy1:         { sX: 116, sY: 4,   sWidth: 80,  sHeight: 60,  dWidth: 80,  dHeight: 60  },
                enemyBullet:    { sX: 204, sY: 4,   sWidth: 16,  sHeight: 16,  dWidth: 16,  dHeight: 16  },
                answerBox:      { sX: 4,   sY: 72,  sWidth: 140, sHeight: 80,  dWidth: 140, dHeight: 80  },
                powerupShield:  { sX: 148, sY: 72,  sWidth: 60,  sHeight: 60,  dWidth: 60,  dHeight: 60  },
                powerupBomb:    { sX: 216, sY: 72,  sWidth: 60,  sHeight: 60,  dWidth: 60,  dHeight: 60  },
                powerupSparkle: { sX: 284, sY: 72,  sWidth: 60,  sHeight: 60,  dWidth: 60,  dHeight: 60  }
            },
            loadSpriteSheet: function(url) {
                if (this.isLoading || this.isLoaded) return; this.isLoading = true;
                this.spriteSheetImage = new Image();
                this.spriteSheetImage.onload = () => { this.isLoaded = true; this.isLoading = false; console.log("Sprite sheet loaded successfully."); };
                this.spriteSheetImage.onerror = () => { this.isLoaded = false; this.isLoading = false; console.error("Failed to load sprite sheet from:", url); };
                this.spriteSheetImage.src = url;
            },
            getSprite: function(name) { if (!this.isLoaded || !this.spriteData[name]) return null; return this.spriteData[name];}
        };

        // Game Variables
        let score = 0; 
        const SCORE_TO_WIN = 200; 
        const SCORE_TO_LOSE = -20; 
        const POINTS_CORRECT_ANSWER = 10; const POINTS_ENEMY_DESTROYED = 5;
        const PENALTY_WRONG_ANSWER = -5; const PENALTY_MISSED_CORRECT = -5; const PENALTY_PLAYER_HIT = -10;
        let spaceship = { x: 0, y: 0, width: spriteManager.spriteData.spaceship.dWidth, height: spriteManager.spriteData.spaceship.dHeight, dx: 0, acceleration: 0.5, maxSpeed: 7, friction: 0.92, shields: 0, isInvincible: false, invincibilityTimer: 0, spriteName: 'spaceship' };
        let bullets = []; let answers = []; let enemies = []; let enemyBullets = []; let powerups = []; let particles = []; 
        let keys = {}; let mouseX = 0; let mouseActive = false;
        const stars = []; const numStars = 150;
        const ANSWER_TRAVEL_TIME_SECONDS = 10; 
        let questionsAnsweredCorrectlyInLevel = 0;
        const POWERUP_SPAWN_INTERVAL = 3; 
        const POWERUP_TYPES = { ANSWER_BOMB: 'ANSWER_BOMB', SHIELD: 'SHIELD', SPARKLE_BOMB: 'SPARKLE_BOMB' };
        let currentProblem = {}; 
        let gameJustReset = false; 

        // --- Stats & Progress Helper Functions ---
        function getCanonicalProblemString(problem) {
            if (problem.operator === 'Makes') { return "Making 10"; }
            if (problem.operator === '+') { return problem.a <= problem.b ? `${problem.a} + ${problem.b}` : `${problem.b} + ${problem.a}`; }
            return problem.a <= problem.b ? `${problem.a} × ${problem.b}` : `${problem.b} × ${problem.a}`;
        }
        function loadPlayerProgress() {
            const progress = localStorage.getItem(PLAYER_PROGRESS_KEY);
            playerProgressIndex = progress ? parseInt(progress, 10) : 0;
            const lastCompletedNode = gameJourney[playerProgressIndex - 1];
            if (lastCompletedNode) {
                currentPhase = lastCompletedNode.phase;
            } else {
                currentPhase = 'addition';
            }
        }
        function savePlayerProgress() { localStorage.setItem(PLAYER_PROGRESS_KEY, playerProgressIndex); }
        function loadOverallStats() { const statsJson = localStorage.getItem(PLAYER_STATS_KEY); if (statsJson) { overallPlayerStats = JSON.parse(statsJson); } else { overallPlayerStats = {}; } }
        function saveOverallStats() { localStorage.setItem(PLAYER_STATS_KEY, JSON.stringify(overallPlayerStats)); }
        function updateOverallStats() { for (const problemKey in levelProblemStats) { if (!overallPlayerStats[problemKey]) { overallPlayerStats[problemKey] = { successes: 0, failures: 0 }; } overallPlayerStats[problemKey].successes += levelProblemStats[problemKey].successes; overallPlayerStats[problemKey].failures += levelProblemStats[problemKey].failures; } saveOverallStats(); }
        
        function clearAllGameEntitiesAndTimers() {
            bullets = []; answers = []; enemies = []; enemyBullets = []; powerups = []; particles = [];
        }

        // --- Node Controller & Map Functions ---
        function startMission(missionIndex) {
            loadNode(missionIndex);
        }

        function displayLearningMap(phase) {
            learningMapTitle.textContent = `${phase.charAt(0).toUpperCase() + phase.slice(1)} Training`;
            mapContainer.innerHTML = '';
            const missions = [];
            
            gameJourney.forEach((node, index) => {
                if (node.phase === phase && (node.type === 'instruction' || node.type === 'practice' || node.type === 'final_challenge')) {
                    if (!missions.find(m => m.topic === node.topic)) {
                        missions.push({
                            topic: node.topic,
                            startIndex: index,
                        });
                    }
                }
            });

            missions.forEach((mission) => {
                const mapNodeDiv = document.createElement('div');
                mapNodeDiv.className = 'map-node';

                let status = 'locked';
                if (missionsUnlocked || mission.startIndex < playerProgressIndex) status = 'completed';
                if (mission.startIndex === playerProgressIndex) status = 'current';
                
                if (missionsUnlocked && status !== 'completed') {
                    status = 'current';
                }

                mapNodeDiv.classList.add(status);
                
                const nodeTitle = document.createElement('h3');
                nodeTitle.textContent = mission.topic;
                mapNodeDiv.appendChild(nodeTitle);

                const nodeDesc = document.createElement('p');
                nodeDesc.textContent = `Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`;
                mapNodeDiv.appendChild(nodeDesc);

                if (status === 'current' || status === 'completed') {
                    mapNodeDiv.addEventListener('click', () => startMission(mission.startIndex));
                }
                
                mapContainer.appendChild(mapNodeDiv);
            });
            
            const lastNodeOfPhase = [...gameJourney].reverse().find(node => node.phase === phase);
            const lastNodeIndex = gameJourney.findIndex(node => node.id === lastNodeOfPhase.id);
            if (playerProgressIndex > lastNodeIndex && phase === 'addition') {
                nextPhaseBtn.style.display = 'block';
            } else {
                nextPhaseBtn.style.display = 'none';
            }
            
            skipToMultBtn.style.display = (phase === 'addition') ? 'inline-block' : 'none';
            devFillGridBtn.style.display = (phase === 'multiplication') ? 'inline-block' : 'none';
        }

        function loadNode(nodeIndex) {
            if (nodeIndex >= gameJourney.length) {
                console.log("Journey Complete!");
                setGameState(GAME_STATE.MENU); 
                return;
            }
            
            currentNodeData = gameJourney[nodeIndex];
            
            switch (currentNodeData.type) {
                case 'instruction':
                    instructionTitle.textContent = currentNodeData.title;
                    instructionText.textContent = currentNodeData.instructions;
                    instructionContinueBtn.onclick = () => loadNode(nodeIndex + 1);
                    setGameState(GAME_STATE.INSTRUCTION);
                    break;
                case 'practice':
                case 'challenge':
                    setGameState(GAME_STATE.PLAYING);
                    break;
                case 'report':
                    levelCompleteTitle.textContent = "Training Complete!";
                    finalScoreCompleteEl.textContent = `Analysis for: ${currentNodeData.title}`;
                    updateOverallStats(); 
                    displayLevelReport('levelReportComplete'); 
                    levelCompleteScreen.style.display = 'flex';
                    nextLevelBtn.textContent = "Return to Mission Map";
                    nextLevelBtn.onclick = () => {
                        playerProgressIndex = nodeIndex + 1;
                        savePlayerProgress();
                        displayLearningMap(currentPhase);
                        setGameState(GAME_STATE.LEARNING_MAP);
                    };
                    break;
                case 'final_challenge':
                    displayOverallHeatmap(challengeHeatmapContainer);
                    setGameState(GAME_STATE.FINAL_CHALLENGE);
                    break;
            }
        }

        function setGameState(newState) {
            previousGameState = currentGameState; 
            currentGameState = newState;
            gameJustReset = false;

            const allScreens = document.querySelectorAll('.screen');
            allScreens.forEach(s => s.style.display = 'none');
            
            gameUiContainer.style.display = 'none'; 
            canvas.style.display = 'block'; 

            switch (newState) {
                case GAME_STATE.MENU: mainMenuScreen.style.display = 'flex'; if (previousGameState === GAME_STATE.PLAYING || previousGameState === GAME_STATE.LEVEL_COMPLETE || previousGameState === GAME_STATE.GAME_OVER) { clearAllGameEntitiesAndTimers(); } break;
                case GAME_STATE.LEVEL_SELECT: levelSelectScreen.style.display = 'flex'; break;
                case GAME_STATE.PLAYING: gameUiContainer.style.display = 'flex'; if(previousGameState !== GAME_STATE.PAUSED && previousGameState !== GAME_STATE.WAVE_ALERT) { resetGameForNewLevel(); gameJustReset = true; } break;
                case GAME_STATE.PAUSED: pauseMenuScreen.style.display = 'flex'; gameUiContainer.style.display = 'flex'; break;
                case GAME_STATE.LEVEL_COMPLETE: 
                    if (currentNodeData.type === 'final_challenge' && previousGameState !== GAME_STATE.GRADUATION) {
                        setGameState(GAME_STATE.GRADUATION);
                    } else {
                        finalScoreCompleteEl.textContent=`Your Final Score: ${score}`; 
                        updateOverallStats(); 
                        displayLevelReport('levelReportComplete'); 
                        levelCompleteScreen.style.display = 'flex'; 
                        nextLevelBtn.textContent = "Next Level";
                    }
                    break;
                case GAME_STATE.GAME_OVER: 
                    if (currentNodeData.id) {
                        gameOverTitle.textContent = "Mission Failed, Cadet!";
                        tryAgainBtn.textContent = "Try Mission Again";
                    } else {
                        gameOverTitle.textContent = "Game Over!";
                        tryAgainBtn.textContent = "Try Again";
                    }
                    finalScoreGameOverEl.textContent=`Your Final Score: ${score}`; 
                    updateOverallStats(); 
                    displayLevelReport('gameOverReport'); 
                    gameOverScreen.style.display = 'flex'; 
                    break;
                case GAME_STATE.REPORTING_MENU: reportingMenuScreen.style.display = 'flex'; break;
                case GAME_STATE.HEATMAP_REPORT: displayOverallHeatmap(heatmapContainer); heatmapReportScreen.style.display = 'flex'; break;
                case GAME_STATE.SETTINGS: settingsScreen.style.display = 'flex'; clearHistoryStatusEl.textContent = ''; break; 
                case GAME_STATE.JOURNEY_INTRO: journeyIntroScreen.style.display = 'flex'; break;
                case GAME_STATE.LEARNING_MAP: learningMapScreen.style.display = 'flex'; break;
                case GAME_STATE.INSTRUCTION: instructionScreen.style.display = 'flex'; break;
                case GAME_STATE.FINAL_CHALLENGE: finalChallengeScreen.style.display = 'flex'; break;
                case GAME_STATE.WAVE_ALERT: waveAlertModal.style.display = 'flex'; break;
                case GAME_STATE.GRADUATION: graduationScreen.style.display = 'flex'; gameUiContainer.style.display = 'flex'; break;
            }
        }
        
        function resetGameForNewLevel() {
            score = 0; 
            questionsAnsweredCorrectlyInLevel = 0; 
            levelProblemStats = {}; 
            clearAllGameEntitiesAndTimers();
            finalChallengeWaveEvent = false;
            waveEventTriggered = false;
            waveEnemiesActive = false;
            correctAnswertShotInWave = false;
            
            if (currentNodeData.type === 'final_challenge') {
                masteryProblemSet = generateMasteryProblemSet();
                sessionMastery = {};
                if (masteryProblemSet.length <= 20) {
                    finalChallengeWaveEvent = true;
                }
                const targetScore = masteryProblemSet.length > 20 ? 400 : 200;
                currentNodeData.config = { winCondition: { type: 'score', value: targetScore } };
                scoreEl.textContent = `Score: 0 / ${targetScore}`;
            } else {
                 scoreEl.textContent = `Score: ${score}`; 
            }

            const shipSpr = spriteManager.getSprite('spaceship') || {dWidth:80, dHeight:60}; 
            spaceship.width = shipSpr.dWidth; spaceship.height = shipSpr.dHeight; spaceship.x = canvas.width/2; spaceship.y = canvas.height - (shipSpr.dHeight + 20); 
            spaceship.dx = 0; spaceship.shields = 0; spaceship.isInvincible = false; spaceship.invincibilityTimer = 0;
            updateShieldsDisplay(); mouseX = spaceship.x; keys = {}; 
            generateProblem(); 
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth; canvas.height = window.innerHeight;
            const shipSpr = spriteManager.getSprite('spaceship') || {dWidth:80,dHeight:60}; 
            if(currentGameState === GAME_STATE.PLAYING || (currentGameState !== GAME_STATE.MENU && currentGameState !== GAME_STATE.LEVEL_SELECT && spaceship.y === 0)){ 
                 spaceship.x = canvas.width/2; spaceship.y = canvas.height - (shipSpr.dHeight + 20);
                 spaceship.dx = 0; if(answers.length === 0 && currentGameState === GAME_STATE.PLAYING) generateProblem(); 
            } else if(currentGameState === GAME_STATE.MENU || currentGameState === GAME_STATE.LEVEL_SELECT){
                spaceship.y = canvas.height - (shipSpr.dHeight + 20); 
            }
            stars.length = 0; for(let i=0; i<numStars; i++) stars.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, size:Math.random()*2+0.5, speed:Math.random()*0.5+0.1, opacity:Math.random()*0.5+0.3});
        }
        
        function checkOverlap(r1,r2){if(!r1||!r2||typeof r1.x==='undefined'||typeof r1.y==='undefined'||typeof r1.width==='undefined'||typeof r1.height==='undefined'||typeof r2.x==='undefined'||typeof r2.y==='undefined'||typeof r2.width==='undefined'||typeof r2.height==='undefined')return false;const r1L=r1.x-r1.width/2,r1R=r1.x+r1.width/2,r1T=r1.y-r1.height/2,r1B=r1.y+r1.height/2;const r2L=r2.x-r2.width/2,r2R=r2.x+r2.width/2,r2T=r2.y-r2.height/2,r2B=r2.y+r2.height/2;return!(r1R<r2L||r1L>r2R||r1B<r2T||r1T>r2B);}

        // --- REFACTORED CORE GAMEPLAY LOGIC ---
        const problemGenerators = {
            'add_plus_one': () => {
                const num1 = Math.floor(Math.random() * 10) + 2;
                return { num1: num1, num2: 1, operator: '+', answer: num1 + 1 };
            },
            'add_doubles': () => { const a = Math.floor(Math.random() * 9) + 2; return { num1: a, num2: a, operator: '+', answer: a + a }; },
            'add_making_10': () => {
                const pairs = []; const usedNumbers = new Set();
                const a = Math.floor(Math.random() * 9) + 1; const b = 10 - a;
                pairs.push({ text: `${a} + ${b}`, correct: true }); usedNumbers.add(a); usedNumbers.add(b);
                for (let i = 0; i < 4; i++) {
                    let p1, p2;
                    do { p1 = Math.floor(Math.random() * 9) + 1; p2 = Math.floor(Math.random() * 9) + 1; } while (p1 + p2 === 10 || usedNumbers.has(p1) || usedNumbers.has(p2));
                    pairs.push({ text: `${p1} + ${p2}`, correct: false }); usedNumbers.add(p1); usedNumbers.add(p2);
                }
                for (let i = pairs.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pairs[i], pairs[j]] = [pairs[j], pairs[i]]; }
                return { operator: 'Makes', answer: 10, pairs: pairs };
            },
            'mult_by_zero_one': () => { const a = Math.floor(Math.random() * 12) + 1; const b = Math.random() < 0.5 ? 0 : 1; return Math.random() < 0.5 ? { num1: a, num2: b, operator: '×', answer: a * b } : { num1: b, num2: a, operator: '×', answer: a * b }; },
            'mult_by_two': () => { const a = Math.floor(Math.random() * 12) + 1; return { num1: 2, num2: a, operator: '×', answer: 2 * a }; },
            'mult_by_ten': () => { const a = Math.floor(Math.random() * 12) + 1; return { num1: 10, num2: a, operator: '×', answer: 10 * a }; },
            'mult_commutative': () => {
                const taughtFactors = [0, 1, 2, 10];
                const factor1 = taughtFactors[Math.floor(Math.random() * taughtFactors.length)];
                let factor2;
                do {
                    factor2 = Math.floor(Math.random() * 12) + 1;
                } while (factor2 === factor1);
                return Math.random() < 0.5 ? { num1: factor1, num2: factor2, operator: '×', answer: factor1 * factor2 } : { num1: factor2, num2: factor1, operator: '×', answer: factor1 * factor2 };
            },
            'mult_by_five_evens': () => { const a = (Math.floor(Math.random() * 6) + 1) * 2; return { num1: 5, num2: a, operator: '×', answer: 5 * a }; },
            'mult_by_five_odds': () => { const a = (Math.floor(Math.random() * 6) * 2) + 1; return { num1: 5, num2: a, operator: '×', answer: 5 * a }; },
            'mult_by_three_four': () => { const a = Math.floor(Math.random() * 12) + 1; const b = Math.random() < 0.5 ? 3 : 4; return Math.random() < 0.5 ? { num1: a, num2: b, operator: '×', answer: a * b } : { num1: b, num2: a, operator: '×', answer: a * b }; },
            'mult_squares': () => { const a = Math.floor(Math.random() * 11) + 2; return { num1: a, num2: a, operator: '×', answer: a * a }; },
            'mult_by_nine': () => { const a = Math.floor(Math.random() * 12) + 1; return { num1: 9, num2: a, operator: '×', answer: 9 * a }; },
            'mult_by_six_seven_eight': () => { const a = Math.floor(Math.random() * 12) + 1; const b = [6, 7, 8][Math.floor(Math.random() * 3)]; return Math.random() < 0.5 ? { num1: a, num2: b, operator: '×', answer: a * b } : { num1: b, num2: a, operator: '×', answer: a * b }; },
            'mult_by_eleven_twelve': () => { const a = Math.floor(Math.random() * 12) + 1; const b = Math.random() < 0.5 ? 11 : 12; return Math.random() < 0.5 ? { num1: a, num2: b, operator: '×', answer: a * b } : { num1: b, num2: a, operator: '×', answer: a * b }; },
            'legacy_multiply': (levelValue) => { let a = levelValue; let b = Math.floor(Math.random() * 12) + 1; return Math.random() < 0.5 ? { num1: a, num2: b, operator: '×', answer: a * b } : { num1: b, num2: a, operator: '×', answer: a * b }; },
            'legacy_core': (levelType) => { let range = 6; if (levelType === 'JOURNEYMAN') range = 9; if (levelType === 'MASTER') range = 12; const a = Math.floor(Math.random() * range) + 1; const b = Math.floor(Math.random() * range) + 1; return { num1: a, num2: b, operator: '×', answer: a * b }; }
        };

        function generateMasteryProblemSet() {
            const problemsToPractice = [];
            for (let i = 1; i <= 12; i++) {
                for (let j = i; j <= 12; j++) { // Iterate j from i to avoid duplicate pairs (e.g., 2x3 and 3x2)
                    const problemKey = getCanonicalProblemString({a: i, b: j, operator: '×'});
                    const stats = overallPlayerStats[problemKey] || { successes: 0, failures: 0 };
                    const totalAttempts = stats.successes + stats.failures;
                    const successRate = totalAttempts > 0 ? stats.successes / totalAttempts : 0;

                    if (successRate < 0.9) {
                        // Add problems with lower success rates more often to the practice pool
                        const weight = Math.max(1, 5 - Math.floor(successRate * 5)); // Weight from 1 to 5
                        for (let k = 0; k < weight; k++) {
                            problemsToPractice.push({ num1: i, num2: j, operator: '×', answer: i * j });
                        }
                    }
                }
            }
            return problemsToPractice.length > 0 ? problemsToPractice : [{ num1: 1, num2: 1, operator: '×', answer: 1 }]; // Fallback
        }

        function generateProblem() {
            if (waveEnemiesActive && enemies.length > 0) {
                // Do not generate a new problem until wave enemies are cleared
                return;
            }
            correctAnswertShotInWave = false; // Reset for the new wave/problem

            let problemData;

            if (currentNodeData.type === 'final_challenge') {
                if (masteryProblemSet.length === 0) {
                    setGameState(GAME_STATE.LEVEL_COMPLETE);
                    return;
                }
                const problemIndex = Math.floor(Math.random() * masteryProblemSet.length);
                problemData = masteryProblemSet[problemIndex];
            }
            else if (currentNodeData.problemSet) {
                const generator = problemGenerators[currentNodeData.problemSet];
                problemData = generator ? generator() : { num1: 0, num2: 0, operator: '?', answer: 0 };
            } 
            else if (selectedLevelType) {
                 problemData = (selectedLevelType === 'PRACTICE') 
                    ? problemGenerators['legacy_multiply'](selectedLevelValue) 
                    : problemGenerators['legacy_core'](selectedLevelType);
            } else {
                 problemData = { num1: 0, num2: 0, operator: '?', answer: 0 };
            }
            
            answers = [];
            const ansSpr = spriteManager.getSprite('answerBox') || {dWidth:140,dHeight:80};
            const ansW = ansSpr.dWidth, ansH = ansSpr.dHeight;
            const ansVy = (canvas.height + ansH) / (ANSWER_TRAVEL_TIME_SECONDS * 60);

            if (problemData.pairs) {
                problemEl.textContent = `Makes ${problemData.answer}`;
                currentProblem = { a: '?', b: '?', answer: problemData.answer, operator: 'Makes' };
                
                problemData.pairs.forEach(pair => {
                    let placed = false;
                    for (let att = 0; att < 30 && !placed; att++) {
                        const newA = { value: pair.text, x: Math.random() * (canvas.width - ansW - 20) + (ansW/2) + 10, y: 0 - ansH/2 - (Math.random() * 140), vy: ansVy, width: ansW, height: ansH, correct: pair.correct, spriteName: 'answerBox' };
                        if (!answers.some(ex => checkOverlap(newA, ex))) { answers.push(newA); placed = true; }
                    }
                });
            } 
            else {
                const { num1, num2, operator, answer } = problemData;
                currentProblem = { a: num1, b: num2, answer: answer, operator: operator };
                problemEl.textContent = `${num1} ${operator} ${num2} = ?`;
                
                const usedAnsVals = new Set([answer]);
                let placedCorrect = false;
                for(let att=0; att<50 && !placedCorrect; att++){
                    const newA = {value: answer, x: Math.random() * (canvas.width - ansW - 20) + (ansW/2) + 10, y: 0 - ansH/2 - (Math.random() * 40), vy: ansVy, width: ansW, height: ansH, correct: true, spriteName: 'answerBox'};
                    if(!answers.some(ex => checkOverlap(newA, ex))){ answers.push(newA); placedCorrect = true; }
                }
                if(!placedCorrect) answers.push({value: answer, x: canvas.width/2, y: 0 - ansH/2, vy: ansVy, width: ansW, height: ansH, correct: true, spriteName: 'answerBox'});

                const numDist = currentNodeData.config?.distractors ?? (selectedLevelType==='APPRENTICE'?3:(selectedLevelType==='JOURNEYMAN'?4:5));
                for(let i=0; i < numDist; i++){
                    let wrongV;
                    for(let vA=0; vA < 20; vA++){
                        const offset = (Math.floor(Math.random() * 3) + 1) * (Math.random() < 0.5 ? -1 : 1);
                        wrongV = answer + offset;
                        if(wrongV > 0 && !usedAnsVals.has(wrongV)) break;
                    }
                    if(usedAnsVals.has(wrongV)) continue;
                    usedAnsVals.add(wrongV);
                    for(let pA=0; pA<30; pA++){
                        const newD = {value: wrongV, x: Math.random()*(canvas.width-ansW-20)+(ansW/2)+10, y: 0 - ansH/2-(Math.random()*140), vy:ansVy, width:ansW, height:ansH, correct:false, spriteName:'answerBox'};
                        if(!answers.some(ex => checkOverlap(newD,ex))){ answers.push(newD); break; }
                    }
                }
            }
            
            spawnEnemies();
            spawnPowerup();
        }

        function spawnEnemies(){
            if (waveEnemiesActive) {
                const enS = spriteManager.getSprite('enemy1') || {dWidth:80,dHeight:60};
                const enW = enS.dWidth, enH = enS.dHeight;
                enemies.push({ x: canvas.width * 0.5, y: canvas.height * 0.15, width: enW, height: enH, vy: 0, vx: 2, fireRate: 2000, lastFiredTime: Date.now(), canTarget: false, health: 1, spriteName: 'enemy1', movement: 'patrol' });
                return;
            }

            enemies=[];
            let spawnConfig = currentNodeData.config?.enemies;
            if (!spawnConfig && selectedLevelType) {
                if (selectedLevelType === 'APPRENTICE') spawnConfig = { count: 1, fireRate: 3000, canTarget: false };
                else if (selectedLevelType === 'JOURNEYMAN') spawnConfig = { count: 2, fireRate: 2000, canTarget: false };
                else if (selectedLevelType === 'MASTER') spawnConfig = { count: 2, fireRate: 2000, canTarget: true };
            }
            if (!spawnConfig || spawnConfig === false) return;

            const enS = spriteManager.getSprite('enemy1') || {dWidth:80,dHeight:60};
            const enW = enS.dWidth, enH = enS.dHeight;
            const enVy = (canvas.height + enH) / ((ANSWER_TRAVEL_TIME_SECONDS + 2) * 60);
            
            for(let i = 0; i < (spawnConfig.count || 0); i++){
                let placed = false;
                for(let att=0; att < 20 && !placed; att++){
                    const nE = { x: Math.random()*(canvas.width - enW - 20) + (enW/2) + 10, y: 0 - enH/2 - (Math.random() * 200), width: enW, height: enH, vy: enVy, fireRate: spawnConfig.fireRate || 3000, lastFiredTime: Date.now() + Math.random() * (spawnConfig.fireRate || 3000), canTarget: spawnConfig.canTarget || false, health: 1, spriteName: 'enemy1' };
                    if(!(answers.some(ans => checkOverlap(nE,ans)) || enemies.some(e => checkOverlap(nE,e)))){ enemies.push(nE); placed = true; }
                }
            }
        }
        
        function spawnPowerup(){
            let shouldSpawn = currentNodeData.config?.powerups ?? false;
             if (!shouldSpawn && selectedLevelType) {
                if((selectedLevelType==='JOURNEYMAN'||selectedLevelType==='MASTER')&&(questionsAnsweredCorrectlyInLevel > 0 && questionsAnsweredCorrectlyInLevel % POWERUP_SPAWN_INTERVAL === 0)) { shouldSpawn = true; }
             }
            if (!shouldSpawn || powerups.length > 0) return;

            const pTypes=Object.values(POWERUP_TYPES);const type=pTypes[Math.floor(Math.random()*pTypes.length)];let sN='',iTxt='';if(type===POWERUP_TYPES.SHIELD){sN='powerupShield';iTxt='S🛡️';}else if(type===POWERUP_TYPES.ANSWER_BOMB){sN='powerupBomb';iTxt='B💣';}else if(type===POWERUP_TYPES.SPARKLE_BOMB){sN='powerupSparkle';iTxt='✨';}
            const pS=spriteManager.getSprite(sN)||{dWidth:60,dHeight:60};const pSize=pS.dWidth;const pVy=(canvas.height+pSize)/((ANSWER_TRAVEL_TIME_SECONDS-2)*60);powerups.push({x:Math.random()*(canvas.width-pSize-20)+(pSize/2)+10,y:0-pSize/2,width:pSize,height:pSize,vy:pVy,type:type,acquired:false,spriteName:sN,iconText:iTxt});
        }

        // --- DRAWING FUNCTIONS ---
        function drawSpaceship(){const spr=spriteManager.getSprite(spaceship.spriteName);if(spr&&spriteManager.isLoaded&&spriteManager.spriteSheetImage){if(spaceship.isInvincible&&Math.floor(Date.now()/100)%2===0)return;ctx.drawImage(spriteManager.spriteSheetImage,spr.sX,spr.sY,spr.sWidth,spr.sHeight,spaceship.x-spr.dWidth/2,spaceship.y-spr.dHeight/2,spr.dWidth,spr.dHeight);}else{if(spaceship.isInvincible&&Math.floor(Date.now()/100)%2===0)return;ctx.fillStyle='#00ffff';ctx.beginPath();ctx.moveTo(spaceship.x,spaceship.y-spaceship.height/2);ctx.lineTo(spaceship.x-spaceship.width/2,spaceship.y+spaceship.height/2);ctx.lineTo(spaceship.x+spaceship.width/2,spaceship.y+spaceship.height/2);ctx.closePath();ctx.fill();const eGH=10+Math.random()*5;ctx.fillStyle='#ff4400';ctx.fillRect(spaceship.x-4,spaceship.y+spaceship.height/2,8,eGH);ctx.fillStyle='#ffff00';ctx.fillRect(spaceship.x-2,spaceship.y+spaceship.height/2,4,eGH-2);}}
        function drawBullets(bArr,defSprName){bArr.forEach(b=>{const spr=spriteManager.getSprite(b.spriteName||defSprName);if(spr&&spriteManager.isLoaded&&spriteManager.spriteSheetImage){ctx.drawImage(spriteManager.spriteSheetImage,spr.sX,spr.sY,spr.sWidth,spr.sHeight,b.x-spr.dWidth/2,b.y-spr.dHeight/2,spr.dWidth,spr.dHeight);}else{const clr=(b.spriteName==='enemyBullet')?'#FF6347':'#ffff00';const rad=(b.spriteName==='enemyBullet')?8:10;ctx.fillStyle=b.color||clr;ctx.beginPath();ctx.arc(b.x,b.y,b.width/2||rad,0,Math.PI*2);ctx.fill();ctx.shadowColor=b.color||clr;ctx.shadowBlur=8;ctx.fill();ctx.shadowBlur=0;}});}
        function drawRoundedRect(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);c.lineTo(x,y+r);c.quadraticCurveTo(x,y,x+r,y);c.closePath();}
        function drawAnswers(){answers.forEach(ans=>{const spr=spriteManager.getSprite(ans.spriteName);const dX=ans.x-ans.width/2,dY=ans.y-ans.height/2;if(spr&&spriteManager.isLoaded&&spriteManager.spriteSheetImage)ctx.drawImage(spriteManager.spriteSheetImage,spr.sX,spr.sY,spr.sWidth,spr.sHeight,dX,dY,ans.width,ans.height);else{ctx.fillStyle='rgba(0,100,255,0.7)';ctx.strokeStyle='#00ffff';ctx.lineWidth=2;drawRoundedRect(ctx,dX,dY,ans.width,ans.height,8);ctx.fill();ctx.stroke();}
        ctx.fillStyle='white';ctx.font='bold 24px Inter,Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(ans.value,ans.x,ans.y);});}
        function drawEnemies(){enemies.forEach(en=>{const spr=spriteManager.getSprite(en.spriteName);if(spr&&spriteManager.isLoaded&&spriteManager.spriteSheetImage)ctx.drawImage(spriteManager.spriteSheetImage,spr.sX,spr.sY,spr.sWidth,spr.sHeight,en.x-spr.dWidth/2,en.y-spr.dHeight/2,spr.dWidth,spr.dHeight);else{ctx.fillStyle=en.color||'#FF6347';ctx.beginPath();ctx.moveTo(en.x,en.y+en.height/2);ctx.lineTo(en.x-en.width/2,en.y-en.height/2);ctx.lineTo(en.x+en.width/2,en.y-en.height/2);ctx.closePath();ctx.fill();}});}
        function drawPowerups(){powerups.forEach(p=>{if(!p.acquired){const spr=spriteManager.getSprite(p.spriteName);if(spr&&spriteManager.isLoaded&&spriteManager.spriteSheetImage)ctx.drawImage(spriteManager.spriteSheetImage,spr.sX,spr.sY,spr.sWidth,spr.sHeight,p.x-spr.dWidth/2,p.y-spr.dHeight/2,spr.dWidth,spr.dHeight);else{ctx.fillStyle=p.type===POWERUP_TYPES.SHIELD?'rgba(0,255,0,0.7)':p.type===POWERUP_TYPES.ANSWER_BOMB?'rgba(255,165,0,0.7)':'rgba(255,255,0,0.7)';ctx.strokeStyle='#FFFFFF';ctx.lineWidth=2;drawRoundedRect(ctx,p.x-p.width/2,p.y-p.height/2,p.width,p.height,5);ctx.fill();ctx.stroke();ctx.fillStyle='black';ctx.font='bold 20px Inter,Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(p.iconText,p.x,p.y);}}});}
        function drawParticles(){particles.forEach(p=>{ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();});}
        function drawStars(){stars.forEach(s=>{ctx.fillStyle='white';s.opacity+=(Math.random()-0.5)*0.1;s.opacity=Math.max(0.2,Math.min(1,s.opacity));ctx.globalAlpha=s.opacity;ctx.beginPath();ctx.arc(s.x,s.y,s.size,0,Math.PI*2);ctx.fill();});ctx.globalAlpha=1;}
        function updateShieldsDisplay(){shieldsDisplayEl.textContent=spaceship.shields>0?`Shields: ${'🛡️'.repeat(spaceship.shields)}`:"";}
        function activatePowerup(p){p.acquired=true;powerups=powerups.filter(pw=>pw!==p);if(p.type===POWERUP_TYPES.ANSWER_BOMB)answers=answers.filter(ans=>ans.correct);else if(p.type===POWERUP_TYPES.SHIELD){spaceship.shields=2;updateShieldsDisplay();}else if(p.type===POWERUP_TYPES.SPARKLE_BOMB)for(let i=0;i<100;i++)particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,size:Math.random()*3+1,color:`rgba(255,255,${Math.floor(Math.random()*155)+100},${Math.random()*0.5+0.5})`,life:60+Math.random()*60,vx:(Math.random()-0.5)*4,vy:(Math.random()-0.5)*4});}
        function updateParticles(){for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.x+=p.vx;p.y+=p.vy;p.life--;if(p.life<=0)particles.splice(i,1);}}
        
        // --- GAME UPDATE & RENDER ---
        function update() {
            if (currentGameState !== GAME_STATE.PLAYING) { 
                if (currentGameState === GAME_STATE.PAUSED || currentGameState === GAME_STATE.WAVE_ALERT) {
                    stars.forEach(s=>{s.y+=s.speed*0.5;if(s.y>canvas.height+s.size){s.y=-s.size;s.x=Math.random()*canvas.width;}});
                    updateParticles();
                }
                return; 
            }
            if (gameJustReset) { gameJustReset = false; return; }

            stars.forEach(s=>{s.y+=s.speed;if(s.y>canvas.height+s.size){s.y=-s.size;s.x=Math.random()*canvas.width;}});updateParticles();if(spaceship.isInvincible){spaceship.invincibilityTimer-=1000/60;if(spaceship.invincibilityTimer<=0)spaceship.isInvincible=false;}
            let mL=keys['ArrowLeft'],mR=keys['ArrowRight'];if(mL)spaceship.dx-=spaceship.acceleration;if(mR)spaceship.dx+=spaceship.acceleration;if(!mL&&!mR)spaceship.dx*=spaceship.friction;if(Math.abs(spaceship.dx)<0.1&&!mL&&!mR)spaceship.dx=0;if(spaceship.dx>spaceship.maxSpeed)spaceship.dx=spaceship.maxSpeed;if(spaceship.dx<-spaceship.maxSpeed)spaceship.dx=-spaceship.maxSpeed;spaceship.x+=spaceship.dx;if(spaceship.x-spaceship.width/2<0){spaceship.x=spaceship.width/2;spaceship.dx=0;}if(spaceship.x+spaceship.width/2>canvas.width){spaceship.x=canvas.width-spaceship.width/2;spaceship.dx=0;}
            if(mouseActive){spaceship.x=mouseX;spaceship.dx=0;if(spaceship.x<spaceship.width/2)spaceship.x=spaceship.width/2;if(spaceship.x>canvas.width-spaceship.width/2)spaceship.x=canvas.width-spaceship.width/2;mouseActive=false;}
            bullets=bullets.filter(b=>{b.y-=b.speed;return b.y>-b.height/2;});enemyBullets=enemyBullets.filter(eb=>{eb.y+=eb.vy;eb.x+=eb.vx;return eb.y<canvas.height+eb.height/2&&eb.y>-eb.height/2&&eb.x>-eb.width/2&&eb.x<canvas.width+eb.width/2;});
            
            let correctAnsMissedThisProblem=false;
            for(let i=answers.length-1;i>=0;i--){
                const ans=answers[i];ans.y+=ans.vy;
                if(ans.y-ans.height/2>canvas.height){
                    if(ans.correct && !correctAnsMissedThisProblem){ 
                        score+=PENALTY_MISSED_CORRECT;scoreEl.textContent=`Score: ${score}`;
                        correctAnsMissedThisProblem=true; 
                        if(score<=SCORE_TO_LOSE){setGameState(GAME_STATE.GAME_OVER); return;}
                    }
                    answers.splice(i,1);
                }
            }
            if(correctAnsMissedThisProblem && answers.filter(a=>a.correct).length===0 && currentGameState === GAME_STATE.PLAYING){ generateProblem(); }

            const curT=Date.now();for(let i=enemies.length-1;i>=0;i--){const en=enemies[i];
                if (en.movement === 'patrol') {
                    en.x += en.vx;
                    if (en.x - en.width/2 < 0 || en.x + en.width/2 > canvas.width) {
                        en.vx *= -1;
                    }
                } else {
                    en.y += en.vy;
                }

                if(en.y-en.height/2>canvas.height){enemies.splice(i,1);continue;}
            if(curT>en.lastFiredTime+en.fireRate){en.lastFiredTime=curT;let bVx=0,bVy=5;if(en.canTarget){const ang=Math.atan2((spaceship.y-spaceship.height/2)-(en.y-en.height/2),spaceship.x-en.x);bVx=Math.cos(ang)*bVy;bVy=Math.sin(ang)*bVy;if(bVy<2)bVy=2;}
            const ebS=spriteManager.getSprite('enemyBullet')||{dWidth:16,dHeight:16};enemyBullets.push({x:en.x,y:en.y+en.height/2,vx:bVx,vy:bVy,width:ebS.dWidth,height:ebS.dHeight,spriteName:'enemyBullet'});}}
            for(let i=powerups.length-1;i>=0;i--){const p=powerups[i];if(!p.acquired){p.y+=p.vy;if(p.y-p.height/2>canvas.height)powerups.splice(i,1);}}
            
            for(let i=bullets.length-1;i>=0;i--){
                const b=bullets[i]; let bulletDestroyedThisLoop=false;
                for(let j=answers.length-1;j>=0;j--){
                    if(bulletDestroyedThisLoop) break;
                    const ans=answers[j];
                    if(checkOverlap(b,ans)){
                        const pStr = getCanonicalProblemString(currentProblem);
                        if(!levelProblemStats[pStr])levelProblemStats[pStr]={successes:0,failures:0};
                        bullets.splice(i,1);bulletDestroyedThisLoop=true;
                        if(ans.correct){
                            score+=POINTS_CORRECT_ANSWER;questionsAnsweredCorrectlyInLevel++;levelProblemStats[pStr].successes++;
                            
                            if (finalChallengeWaveEvent && !waveEventTriggered) {
                                if (score >= currentNodeData.config.winCondition.value / 2) {
                                    waveEventTriggered = true;
                                    setGameState(GAME_STATE.WAVE_ALERT);
                                    return;
                                }
                            }

                            if (currentNodeData.type === 'final_challenge') {
                                if (!sessionMastery[pStr]) sessionMastery[pStr] = 0;
                                sessionMastery[pStr]++;
                                if (sessionMastery[pStr] >= 2) {
                                    masteryProblemSet = masteryProblemSet.filter(p => getCanonicalProblemString(p) !== pStr);
                                }
                            }

                            let isJourneyMode = !!currentNodeData.id;
                            if (isJourneyMode) {
                                const winCondition = currentNodeData.config?.winCondition;
                                if (winCondition?.type === 'correctAnswers' && questionsAnsweredCorrectlyInLevel >= winCondition.value) {
                                    const currentIndex = gameJourney.findIndex(node => node.id === currentNodeData.id);
                                    loadNode(currentIndex + 1);
                                    return;
                                }
                                if (winCondition?.type === 'score' && score >= winCondition.value) {
                                    setGameState(GAME_STATE.LEVEL_COMPLETE);
                                    return;
                                }
                            } else if (!isJourneyMode && score >= SCORE_TO_WIN) {
                                setGameState(GAME_STATE.LEVEL_COMPLETE); 
                                return;
                            }
                            
                            if (waveEnemiesActive) {
                                correctAnswertShotInWave = true;
                                answers = []; // Clear asteroids and wait for enemies
                                if (enemies.length === 0) {
                                    generateProblem();
                                }
                            } else {
                                generateProblem();
                            }
                        } else {
                            score+=PENALTY_WRONG_ANSWER;levelProblemStats[pStr].failures++;answers.splice(j,1);
                            if(!answers.some(a=>a.correct) && currentGameState === GAME_STATE.PLAYING){ if(score>SCORE_TO_LOSE)generateProblem();}
                        }
                        
                        if (currentNodeData.config?.winCondition?.type === 'score') {
                             scoreEl.textContent = `Score: ${score} / ${currentNodeData.config.winCondition.value}`;
                        } else {
                             scoreEl.textContent=`Score: ${score}`;
                        }

                        if(score<=SCORE_TO_LOSE && currentGameState === GAME_STATE.PLAYING){setGameState(GAME_STATE.GAME_OVER); return;}
                        break; 
                    }
                }
                if(bulletDestroyedThisLoop)continue;
                for(let k=enemies.length-1;k>=0;k--){ if(bulletDestroyedThisLoop) break; const en=enemies[k]; if(checkOverlap(b,en)){ bullets.splice(i,1);bulletDestroyedThisLoop=true;en.health--; if(en.health<=0){enemies.splice(k,1);score+=POINTS_ENEMY_DESTROYED;scoreEl.textContent=`Score: ${score}`; if (waveEnemiesActive && enemies.length === 0 && correctAnswertShotInWave) { generateProblem(); } } break; } }
                if(bulletDestroyedThisLoop)continue;
                for(let l=powerups.length-1;l>=0;l--){ if(bulletDestroyedThisLoop) break; const pwr=powerups[l]; if(!pwr.acquired&&checkOverlap(b,pwr)){bullets.splice(i,1);bulletDestroyedThisLoop=true;activatePowerup(pwr);break;} }
            }

            if(!spaceship.isInvincible){
                for(let i=enemyBullets.length-1;i>=0;i--){ const eb=enemyBullets[i]; if(checkOverlap(eb,spaceship)){ enemyBullets.splice(i,1); score += PENALTY_PLAYER_HIT; scoreEl.textContent = `Score: ${score}`; if(spaceship.shields>0){spaceship.shields--;updateShieldsDisplay();spaceship.isInvincible=true;spaceship.invincibilityTimer=1000;} else{setGameState(GAME_STATE.GAME_OVER); return;} break; } }
                if (currentGameState !== GAME_STATE.PLAYING) return;
                for(let i=enemies.length-1;i>=0;i--){ const en=enemies[i]; if(checkOverlap(en,spaceship)){ score += PENALTY_PLAYER_HIT; scoreEl.textContent = `Score: ${score}`; if(spaceship.shields>0){spaceship.shields--;updateShieldsDisplay();spaceship.isInvincible=true;spaceship.invincibilityTimer=1500;enemies.splice(i,1);} else{setGameState(GAME_STATE.GAME_OVER); return;} break; } }
            }
             if (currentGameState === GAME_STATE.PLAYING && score <= SCORE_TO_LOSE) { setGameState(GAME_STATE.GAME_OVER); }
        }

        function render(){ctx.clearRect(0,0,canvas.width,canvas.height);drawStars();drawParticles();if(currentGameState===GAME_STATE.PLAYING||currentGameState===GAME_STATE.PAUSED||currentGameState===GAME_STATE.WAVE_ALERT||currentGameState===GAME_STATE.GRADUATION||currentGameState===GAME_STATE.LEVEL_COMPLETE){drawAnswers();drawEnemies();drawPowerups();drawSpaceship();drawBullets(bullets,'playerBullet');drawBullets(enemyBullets,'enemyBullet');}}
        function gameLoop(){ update(); render(); requestAnimationFrame(gameLoop); }
        function shoot(){if(currentGameState!==GAME_STATE.PLAYING)return;const bS=spriteManager.getSprite('playerBullet')||{dWidth:20,dHeight:20};bullets.push({x:spaceship.x,y:spaceship.y-spaceship.height/2,width:bS.dWidth,height:bS.dHeight,speed:10,spriteName:'playerBullet'});}
        
        function nextLevelSelection(){if(selectedLevelType=="PRACTICE"&&selectedLevelValue<=11)selectedLevelValue+=1;else if(selectedLevelType=="PRACTICE"&&selectedLevelValue==12){selectedLevelType="APPRENTICE";selectedLevelValue=null;}else if(selectedLevelType=="APPRENTICE")selectedLevelType="JOURNEYMAN";else if(selectedLevelType=="JOURNEYMAN")selectedLevelType="MASTER";setGameState(GAME_STATE.PLAYING);}
        
        function displayLevelReport(reportContainerId){
            const rCont=document.getElementById(reportContainerId);if(!rCont)return;const sCont=rCont.querySelector('.report-content-scrollable');if(!sCont)return;const sP=sCont.querySelector('p.final-score-report');sCont.innerHTML='';if(sP)sCont.appendChild(sP);
            if(Object.keys(levelProblemStats).length===0){const noSt=document.createElement('p');noSt.textContent="No problems attempted this level.";sCont.appendChild(noSt);return;}
            let tbl='<table class="stats-table"><thead><tr><th>Problem</th><th>Successes</th><th>Failures</th></tr></thead><tbody>';
            const sortedProbs = Object.keys(levelProblemStats).sort((a,b)=>{const[a1,a2]=a.split(' × ').map(Number);const[b1,b2]=b.split(' × ').map(Number);if(a1!==b1)return a1-b1;return a2-b2;});
            for(const prob of sortedProbs){const st=levelProblemStats[prob];tbl+=`<tr><td>${prob}</td><td>${st.successes}</td><td>${st.failures}</td></tr>`;}
            tbl+='</tbody></table>';sCont.innerHTML+=tbl;
        }

        function displayOverallHeatmap(container) {
            loadOverallStats(); 
            container.innerHTML=''; 
            const maxSize=12;
            const hRow=document.createElement('div');hRow.className='heatmap-header';container.appendChild(hRow);
            for(let i=1;i<=maxSize;i++){const hCell=document.createElement('div');hCell.className='heatmap-header';hCell.textContent=i;container.appendChild(hCell);}
            for(let i=1;i<=maxSize;i++){const rHCell=document.createElement('div');rHCell.className='heatmap-header';rHCell.textContent=i;container.appendChild(rHCell);
                for(let j=1;j<=maxSize;j++){
                    const uProbStr = `${i} × ${j}`; const canonProbStr = getCanonicalProblemString({a:i, b:j, operator: '×'});
                    const stats=overallPlayerStats[canonProbStr]||{successes:0,failures:0};
                    const totalAtt=stats.successes+stats.failures;let cColor='hsl(0,0%,26.7%)';let sRate=0;
                    if(totalAtt>0){sRate=stats.successes/totalAtt;if(sRate>=0.9)cColor='hsl(120,100%,45%)';else if(stats.successes===0&&stats.failures>0)cColor='hsl(0,100%,50%)';else{const hue=sRate*120;cColor=`hsl(${hue},100%,50%)`;}}
                    const cell=document.createElement('div');cell.className='heatmap-cell';cell.style.backgroundColor=cColor;
                    cell.textContent=uProbStr; cell.title=`${uProbStr} (Stats for ${canonProbStr}): ${stats.successes}S / ${stats.failures}F`;container.appendChild(cell);
                }
            }
        }
        
        function handleTouchStart(e) {
            e.preventDefault();
            const touches = e.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                const touch = touches[i];
                if (movementTouchId === null) { // If no finger is currently moving the ship
                    movementTouchId = touch.identifier;
                    touchStartTime = Date.now();
                    touchStartX = touch.clientX;
                    touchStartY = touch.clientY;
                }
            }
        }

        function handleTouchMove(e) {
            e.preventDefault();
            const touches = e.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                const touch = touches[i];
                if (touch.identifier === movementTouchId) {
                    const rect = canvas.getBoundingClientRect();
                    mouseX = touch.clientX - rect.left;
                    mouseActive = true;
                }
            }
        }

        function handleTouchEnd(e) {
            e.preventDefault();
            const touches = e.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                const touch = touches[i];
                if (touch.identifier === movementTouchId) {
                    movementTouchId = null; // Release movement control
                    const touchDuration = Date.now() - touchStartTime;
                    const touchDistance = Math.hypot(touch.clientX - touchStartX, touch.clientY - touchStartY);
                    if (touchDuration < 200 && touchDistance < 20) {
                        shoot();
                    }
                } else {
                    // This was a secondary touch, likely for shooting
                    shoot();
                }
            }
        }

        function setupEventListeners() {
            startJourneyBtn.addEventListener('click', () => setGameState(GAME_STATE.JOURNEY_INTRO));
            beginTrainingBtn.addEventListener('click', () => {
                displayLearningMap(currentPhase);
                setGameState(GAME_STATE.LEARNING_MAP);
            });
            nextPhaseBtn.addEventListener('click', () => {
                currentPhase = 'multiplication';
                displayLearningMap(currentPhase);
            });
            beginFinalChallengeBtn.addEventListener('click', () => {
                setGameState(GAME_STATE.PLAYING);
            });
            challengeReturnToMapBtn.addEventListener('click', () => {
                displayLearningMap(currentPhase);
                setGameState(GAME_STATE.LEARNING_MAP);
            });
            continueWaveBtn.addEventListener('click', () => {
                waveAlertModal.style.display = 'none';
                waveEnemiesActive = true;
                spawnEnemies();
                setGameState(GAME_STATE.PLAYING);
            });
            graduationContinueBtn.addEventListener('click', () => {
                // This will show the standard level complete screen as a final report
                setGameState(GAME_STATE.LEVEL_COMPLETE);
            });
            backToMainMenuFromMapBtn.addEventListener('click', () => setGameState(GAME_STATE.MENU));
            
            // DEV TOOLS
            skipToMultBtn.addEventListener('click', () => {
                currentPhase = 'multiplication';
                playerProgressIndex = gameJourney.findIndex(node => node.phase === 'multiplication');
                savePlayerProgress();
                displayLearningMap(currentPhase);
            });
            unlockMissionsBtn.addEventListener('click', () => {
                missionsUnlocked = !missionsUnlocked;
                unlockMissionsBtn.textContent = missionsUnlocked ? 'DEV: Lock Missions' : 'DEV: Unlock Missions';
                displayLearningMap(currentPhase);
            });
            devFillGridBtn.addEventListener('click', () => {
                devFillGridData();
                saveOverallStats();
                // No visual change on map, but data is ready for final challenge
            });

            selectLevelBtn.addEventListener('click',()=>setGameState(GAME_STATE.LEVEL_SELECT));
            reportingBtn.addEventListener('click',()=>setGameState(GAME_STATE.REPORTING_MENU));
            mainMenuSettingsBtn.addEventListener('click',()=>setGameState(GAME_STATE.SETTINGS));
            backToMainMenuBtnLvl.addEventListener('click',()=>setGameState(GAME_STATE.MENU));
            mainMenuFromCompleteBtn.addEventListener('click',()=>{ currentNodeData = {}; setGameState(GAME_STATE.MENU); });
            mainMenuFromGameOverBtn.addEventListener('click',()=>{ currentNodeData = {}; setGameState(GAME_STATE.MENU); });
            tryAgainBtn.addEventListener('click',()=> {
                if (currentNodeData.id) startMission(playerProgressIndex);
                else setGameState(GAME_STATE.PLAYING);
            });
            
            nextLevelBtn.addEventListener('click', nextLevelSelection);

            pauseGameBtn.addEventListener('click',()=>{if(currentGameState===GAME_STATE.PLAYING)setGameState(GAME_STATE.PAUSED);});
            resumeGameBtn.addEventListener('click',()=>{if(currentGameState===GAME_STATE.PAUSED)setGameState(GAME_STATE.PLAYING);});
            pauseMenuSettingsBtn.addEventListener('click',()=>alert('Settings (Pause Menu): Coming Soon!'));
            exitToMainMenuBtn.addEventListener('click',()=>{ currentNodeData = {}; setGameState(GAME_STATE.MENU); });
            overallPerformanceBtn.addEventListener('click',()=>setGameState(GAME_STATE.HEATMAP_REPORT));
            backToMainMenuFromReportingBtn.addEventListener('click',()=>setGameState(GAME_STATE.MENU));
            backToReportingMenuBtn.addEventListener('click',()=>setGameState(GAME_STATE.REPORTING_MENU));
            
            clearHistoryBtn.addEventListener('click',()=>{confirmationMessageText.textContent="Are you sure you want to clear all player history? This action cannot be undone.";confirmationModal.style.display='flex';});
            confirmClearBtn.addEventListener('click',()=>{overallPlayerStats={};localStorage.removeItem(PLAYER_STATS_KEY);localStorage.removeItem(PLAYER_PROGRESS_KEY);loadPlayerProgress();confirmationModal.style.display='none';clearHistoryStatusEl.textContent='Player history cleared!';setTimeout(()=>clearHistoryStatusEl.textContent='',3000);});
            cancelClearBtn.addEventListener('click',()=>{confirmationModal.style.display='none';});
            backToMainMenuFromSettingsBtn.addEventListener('click',()=>setGameState(GAME_STATE.MENU));

            document.addEventListener('keydown',(e)=>{if(currentGameState===GAME_STATE.PLAYING){keys[e.code]=true;if(e.code==='Space'){e.preventDefault();shoot();}}if(e.code==='Escape'){e.preventDefault();if(currentGameState===GAME_STATE.PLAYING)setGameState(GAME_STATE.PAUSED);else if(currentGameState===GAME_STATE.PAUSED)setGameState(GAME_STATE.PLAYING);}});
            document.addEventListener('keyup',(e)=>{if(currentGameState===GAME_STATE.PLAYING)keys[e.code]=false;});
            canvas.addEventListener('mousemove',(e)=>{if(currentGameState===GAME_STATE.PLAYING){const rect=canvas.getBoundingClientRect();mouseX=e.clientX-rect.left;mouseActive=true;}});
            canvas.addEventListener('click',(e)=>{if(currentGameState===GAME_STATE.PLAYING)shoot();});

            // Touch Events
            canvas.addEventListener('touchstart', handleTouchStart);
            canvas.addEventListener('touchmove', handleTouchMove);
            canvas.addEventListener('touchend', handleTouchEnd);

            window.addEventListener('resize',resizeCanvas);
        }

        function populateLevelSelectMenu(){practiceLevelsContainer.innerHTML='';coreLevelsContainer.innerHTML='';for(let i=1;i<=12;i++){const btn=document.createElement('button');btn.textContent=i;btn.addEventListener('click',()=>{selectedLevelType='PRACTICE';selectedLevelValue=i;setGameState(GAME_STATE.PLAYING);});practiceLevelsContainer.appendChild(btn);}
        const coreLvls=[{name:"Apprentice Blaster",type:'APPRENTICE'},{name:"Journeyman Blaster",type:'JOURNEYMAN'},{name:"Master Blaster",type:'MASTER'}];coreLvls.forEach(lvl=>{const btn=document.createElement('button');btn.textContent=lvl.name;btn.classList.add('core-level-button');btn.addEventListener('click',()=>{selectedLevelType=lvl.type;selectedLevelValue=null;setGameState(GAME_STATE.PLAYING);});coreLevelsContainer.appendChild(btn);});}

        function devFillGridData() {
            const troubleSpots = ['6 × 7', '6 × 8', '7 × 8'];
            for (let i = 1; i <= 12; i++) {
                for (let j = i; j <= 12; j++) {
                    const problemKey = getCanonicalProblemString({a: i, b: j, operator: '×'});
                    if (troubleSpots.includes(problemKey)) {
                        overallPlayerStats[problemKey] = { successes: 1, failures: 5 };
                    } else {
                        overallPlayerStats[problemKey] = { successes: 9, failures: 1 };
                    }
                }
            }
            console.log("DEV: Grid data filled to 90% with some trouble spots.");
        }

        window.onload=()=>{
            loadOverallStats();
            loadPlayerProgress();
            resizeCanvas();
            populateLevelSelectMenu();
            setupEventListeners();
            spriteManager.loadSpriteSheet('https://cdn.jsdelivr.net/gh/tnharvey/mathShooter@main/Spritesheet.png');
            setGameState(GAME_STATE.MENU);
            gameLoop();
        };