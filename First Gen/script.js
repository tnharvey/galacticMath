        // DOM Elements
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const gameUiContainer = document.getElementById('gameUiContainer');
        const problemEl = document.getElementById('problem');
        const scoreEl = document.getElementById('score');
        const shieldsDisplayEl = document.getElementById('shieldsDisplay');


        // Screens & Containers
        const mainMenuScreen = document.getElementById('mainMenu');
        const levelSelectScreen = document.getElementById('levelSelectMenu');
        const practiceLevelsContainer = document.getElementById('practiceLevelsContainer');
        const coreLevelsContainer = document.getElementById('coreLevelsContainer');
        const levelCompleteScreen = document.getElementById('levelCompleteScreen');
        const gameOverScreen = document.getElementById('gameOverScreen');

        // Screen Buttons
        const selectLevelBtn = document.getElementById('selectLevelBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        const backToMainMenuBtnLvl = document.getElementById('backToMainMenuBtnLvl');
        const nextLevelBtn = document.getElementById('nextLevelBtn');
        const mainMenuFromCompleteBtn = document.getElementById('mainMenuFromCompleteBtn');
        const tryAgainBtn = document.getElementById('tryAgainBtn');
        const mainMenuFromGameOverBtn = document.getElementById('mainMenuFromGameOverBtn');
        
        const finalScoreCompleteEl = document.getElementById('finalScoreComplete');
        const finalScoreGameOverEl = document.getElementById('finalScoreGameOver');

        // Game States
        const GAME_STATE = {
            MENU: 'MENU', LEVEL_SELECT: 'LEVEL_SELECT', PLAYING: 'PLAYING',
            LEVEL_COMPLETE: 'LEVEL_COMPLETE', GAME_OVER: 'GAME_OVER'
        };
        let currentGameState = GAME_STATE.MENU;
        let selectedLevelType = null; // 'PRACTICE', 'APPRENTICE', 'JOURNEYMAN', 'MASTER'
        let selectedLevelValue = null; // For practice: 1-12. For core: null or specific difficulty.

        // Game Variables & Constants
        let score = 0;
        const SCORE_TO_WIN = 200; 
        const SCORE_TO_LOSE = -20; 
        const POINTS_CORRECT_ANSWER = 10;
        const POINTS_ENEMY_DESTROYED = 5;
        const PENALTY_WRONG_ANSWER = -5; 
        const PENALTY_MISSED_CORRECT = -5;
        const PENALTY_PLAYER_HIT = -10; // Example penalty if hit without shields, or for other things

        let spaceship = {
            x: 0, y: 0, width: 40, height: 30, dx: 0, 
            acceleration: 0.5, maxSpeed: 7, friction: 0.92, 
            color: '#00ffff', engineColor1: '#ff4400', engineColor2: '#ffff00',
            shields: 0, isInvincible: false, invincibilityTimer: 0
        };
        let bullets = [];
        let answers = []; 
        let enemies = [];
        let enemyBullets = [];
        let powerups = [];
        let particles = []; // For sparkle bomb and other effects

        let keys = {};
        let mouseX = 0;
        let mouseActive = false;
        const stars = [];
        const numStars = 150;
        const ANSWER_TRAVEL_TIME_SECONDS = 10; 
        
        let questionsAnsweredCorrectlyInLevel = 0;
        const POWERUP_SPAWN_INTERVAL = 3; // Spawn powerup every 3 correct answers

        const POWERUP_TYPES = {
            ANSWER_BOMB: 'ANSWER_BOMB',
            SHIELD: 'SHIELD',
            SPARKLE_BOMB: 'SPARKLE_BOMB'
        };
        const POWERUP_DURATION_QUESTIONS = 3; // How many correct answers a powerup effect lasts (for Shield)


        function setGameState(newState) {
            currentGameState = newState;
            // Hide all screens and game UI first
            mainMenuScreen.style.display = 'none';
            levelSelectScreen.style.display = 'none';
            levelCompleteScreen.style.display = 'none';
            gameOverScreen.style.display = 'none';
            gameUiContainer.style.display = 'none';
            canvas.style.display = 'block';

            switch (newState) {
                case GAME_STATE.MENU:
                    mainMenuScreen.style.display = 'flex';
                    break;
                case GAME_STATE.LEVEL_SELECT:
                    levelSelectScreen.style.display = 'flex';
                    break;
                case GAME_STATE.PLAYING:
                    gameUiContainer.style.display = 'flex';
                    resetGameForNewLevel();
                    break;
                case GAME_STATE.LEVEL_COMPLETE:
                    finalScoreCompleteEl.textContent = `Your Score: ${score}`;
                    levelCompleteScreen.style.display = 'flex';
                    break;
                case GAME_STATE.GAME_OVER:
                    finalScoreGameOverEl.textContent = `Your Score: ${score}`;
                    gameOverScreen.style.display = 'flex';
                    break;
            }
        }
        
        function resetGameForNewLevel() {
            score = 0;
            scoreEl.textContent = `Score: ${score}`;
            questionsAnsweredCorrectlyInLevel = 0;
            
            bullets = [];
            answers = []; 
            enemies = [];
            enemyBullets = [];
            powerups = [];
            particles = [];

            spaceship.x = canvas.width / 2;
            spaceship.y = canvas.height - 80;
            spaceship.dx = 0; 
            spaceship.shields = 0; // Reset shields
            spaceship.isInvincible = false;
            spaceship.invincibilityTimer = 0;
            updateShieldsDisplay();

            mouseX = spaceship.x;
            keys = {}; 
            generateProblem(); 
        }
//x
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
        
        function checkOverlap(rect1, rect2) {
            // Check if two rectangles (defined by x,y center, width, height) overlap
            return (
                rect1.x - rect1.width / 2 < rect2.x + rect2.width / 2 &&
                rect1.x + rect1.width / 2 > rect2.x - rect2.width / 2 &&
                rect1.y - rect1.height / 2 < rect2.y + rect2.height / 2 &&
                rect1.y + rect1.height / 2 > rect2.y - rect2.height / 2
            );
        }

        function generateProblem() {
            let a, b;
            // Determine problem difficulty based on selectedLevelType and selectedLevelValue
            if (selectedLevelType === 'PRACTICE') {
                a = selectedLevelValue; // The times table number
                b = Math.floor(Math.random() * 12) + 1;
                if (Math.random() < 0.5) [a,b] = [b,a]; // Randomize order
            } else if (selectedLevelType === 'APPRENTICE') {
                a = Math.floor(Math.random() * 6) + 1; // Numbers 1-6
                b = Math.floor(Math.random() * 6) + 1;
            } else if (selectedLevelType === 'JOURNEYMAN') {
                a = Math.floor(Math.random() * 9) + 1; // Numbers 1-9
                b = Math.floor(Math.random() * 9) + 1;
            } else if (selectedLevelType === 'MASTER') { // Master Blaster
                a = Math.floor(Math.random() * 12) + 1; // Numbers 1-12
                b = Math.floor(Math.random() * 12) + 1;
            } else { // Fallback
                a = Math.floor(Math.random() * 10) + 1;
                b = Math.floor(Math.random() * 10) + 1;
            }
            
            const correctAnswerValue = a * b;
            currentProblem = { a, b, answer: correctAnswerValue };
            problemEl.textContent = `${a} × ${b} = ?`;
            
            answers = []; 
            const usedAnswersValues = new Set([correctAnswerValue]);
            const answerWidth = 70; 
            const answerHeight = 40;
            const answerVy = (canvas.height + answerHeight) / (ANSWER_TRAVEL_TIME_SECONDS * 60);

            // Place Correct Answer (with overlap check)
            let placedCorrect = false;
            for (let attempts = 0; attempts < 50 && !placedCorrect; attempts++) {
                const newAns = {
                    value: correctAnswerValue,
                    x: Math.random() * (canvas.width - answerWidth - 20) + (answerWidth / 2) + 10,
                    y: 0 - answerHeight / 2 - (Math.random() * 20), // Start slightly staggered above screen
                    vy: answerVy, width: answerWidth, height: answerHeight, correct: true
                };
                if (!answers.some(existing => checkOverlap(newAns, existing))) {
                    answers.push(newAns);
                    placedCorrect = true;
                }
            }
            if (!placedCorrect) { // Fallback if no non-overlapping position found
                 answers.push({ value: correctAnswerValue, x: canvas.width / 2, y: 0 - answerHeight / 2, vy: answerVy, width: answerWidth, height: answerHeight, correct: true});
            }


            // Place Distractor Answers (with overlap check)
            const numDistractors = selectedLevelType === 'APPRENTICE' ? 3 : (selectedLevelType === 'JOURNEYMAN' ? 4 : 5);
            for (let i = 0; i < numDistractors; i++) {
                let wrongAnswerValue;
                // Generate unique wrong answer value
                for (let valAttempts = 0; valAttempts < 20; valAttempts++) {
                    const offset = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 5) + 1);
                    wrongAnswerValue = correctAnswerValue + offset * (Math.random() < 0.3 ? b : (Math.random() < 0.6 ? a : (Math.floor(Math.random()*5)+1) ));
                    if (wrongAnswerValue <= 0 || wrongAnswerValue > 144) wrongAnswerValue = Math.floor(Math.random() * ( (selectedLevelType === 'MASTER' || selectedLevelType === 'JOURNEYMAN') ? 144: (selectedLevelType === 'APPRENTICE' ? 36 : 100))) + 1;
                    if (!usedAnswersValues.has(wrongAnswerValue)) break;
                }
                if (usedAnswersValues.has(wrongAnswerValue)) continue; // Skip if couldn't find unique
                usedAnswersValues.add(wrongAnswerValue);

                for (let posAttempts = 0; posAttempts < 30; posAttempts++) {
                    const newDist = {
                        value: wrongAnswerValue,
                        x: Math.random() * (canvas.width - answerWidth - 20) + (answerWidth / 2) + 10,
                        y: 0 - answerHeight / 2 - (Math.random() * 70), // More stagger for distractors
                        vy: answerVy, width: answerWidth, height: answerHeight, correct: false
                    };
                    if (!answers.some(existing => checkOverlap(newDist, existing))) {
                        answers.push(newDist);
                        break; 
                    }
                }
            }
            // Spawn Enemies based on level
            spawnEnemies();
            // Check if Powerup should spawn
            if ( (selectedLevelType === 'JOURNEYMAN' || selectedLevelType === 'MASTER') && 
                 (questionsAnsweredCorrectlyInLevel > 0 && questionsAnsweredCorrectlyInLevel % POWERUP_SPAWN_INTERVAL === 0) ) {
                spawnPowerup();
            }
        }

        function spawnEnemies() {
            enemies = []; // Clear existing enemies for the new problem
            const enemyWidth = spaceship.width;
            const enemyHeight = spaceship.height;
            const enemyVy = (canvas.height + enemyHeight) / ((ANSWER_TRAVEL_TIME_SECONDS + 2) * 60); // Slightly slower than answers

            let numEnemiesToSpawn = 0;
            let fireRate = 3000; // ms
            let canTarget = false;

            if (selectedLevelType === 'APPRENTICE') {
                numEnemiesToSpawn = 1;
                fireRate = 3000; // 3 seconds
            } else if (selectedLevelType === 'JOURNEYMAN') {
                numEnemiesToSpawn = 2;
                fireRate = 2000; // 2 seconds
            } else if (selectedLevelType === 'MASTER') {
                numEnemiesToSpawn = 2; // Can increase later
                fireRate = 2000; // 2 seconds
                canTarget = true;
            }

            for (let i = 0; i < numEnemiesToSpawn; i++) {
                // Try to place enemies without overlapping answers or other enemies
                let placed = false;
                for(let attempt = 0; attempt < 20 && !placed; attempt++) {
                    const newEnemy = {
                        x: Math.random() * (canvas.width - enemyWidth - 20) + (enemyWidth / 2) + 10,
                        y: 0 - enemyHeight - (Math.random() * 100), // Start well above screen
                        width: enemyWidth, height: enemyHeight,
                        vy: enemyVy,
                        color: '#FF6347', // Tomato red
                        fireRate: fireRate,
                        lastFiredTime: Date.now() + Math.random() * fireRate, // Stagger initial firing
                        canTarget: canTarget,
                        health: 1 // One hit kill for now
                    };
                    let overlaps = answers.some(ans => checkOverlap(newEnemy, ans)) || 
                                   enemies.some(en => checkOverlap(newEnemy, en));
                    if (!overlaps) {
                        enemies.push(newEnemy);
                        placed = true;
                    }
                }
            }
        }
        
        function spawnPowerup() {
            if (powerups.length > 0) return; // Only one powerup at a time for now

            const powerupTypesArray = Object.values(POWERUP_TYPES);
            const type = powerupTypesArray[Math.floor(Math.random() * powerupTypesArray.length)];
            const powerupSize = 30;
            const powerupVy = (canvas.height + powerupSize) / ((ANSWER_TRAVEL_TIME_SECONDS - 2) * 60); // Faster than answers

            powerups.push({
                x: Math.random() * (canvas.width - powerupSize - 20) + (powerupSize / 2) + 10,
                y: 0 - powerupSize / 2,
                width: powerupSize, height: powerupSize,
                vy: powerupVy,
                type: type,
                acquired: false,
                activeDuration: 0, // For shield, tracks questions correctly answered while active
                iconText: type === POWERUP_TYPES.ANSWER_BOMB ? 'B💣' : (type === POWERUP_TYPES.SHIELD ? 'S🛡️' : '✨')
            });
        }

        function drawSpaceship() { /* ... (same as before, check for invincibility flash) ... */ 
            if (spaceship.isInvincible && Math.floor(Date.now() / 100) % 2 === 0) {
                // Don't draw if invincible and flashing
            } else {
                ctx.fillStyle = spaceship.color;
                ctx.beginPath();
                ctx.moveTo(spaceship.x, spaceship.y); 
                ctx.lineTo(spaceship.x - spaceship.width / 2, spaceship.y + spaceship.height); 
                ctx.lineTo(spaceship.x + spaceship.width / 2, spaceship.y + spaceship.height); 
                ctx.closePath();
                ctx.fill();
                
                const engineGlowHeight = 10 + Math.random() * 5; 
                ctx.fillStyle = spaceship.engineColor1;
                ctx.fillRect(spaceship.x - 4, spaceship.y + spaceship.height, 8, engineGlowHeight);
                ctx.fillStyle = spaceship.engineColor2;
                ctx.fillRect(spaceship.x - 2, spaceship.y + spaceship.height, 4, engineGlowHeight - 2);
            }
        }

        function drawBullets(bulletArray, color = '#ffff00', radius = 4) { 
            bulletArray.forEach(bullet => {
                ctx.fillStyle = bullet.color || color;
                ctx.beginPath();
                ctx.arc(bullet.x, bullet.y, bullet.radius || radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowColor = bullet.color || color;
                ctx.shadowBlur = 8;
                ctx.fill(); 
                ctx.shadowBlur = 0; 
            });
        }

        function drawRoundedRect(ctx, x, y, width, height, radius) { /* ... (same as before) ... */ 
            ctx.beginPath(); ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y); ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius); ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height); ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius); ctx.quadraticCurveTo(x, y, x + radius, y); ctx.closePath();
        }

        function drawAnswers() { /* ... (same as before) ... */ 
            answers.forEach(answer => {
                ctx.fillStyle = 'rgba(0, 100, 255, 0.7)'; 
                ctx.strokeStyle = '#00ffff'; ctx.lineWidth = 2;
                drawRoundedRect(ctx, answer.x - answer.width / 2, answer.y - answer.height / 2, answer.width, answer.height, 8);
                ctx.fill(); ctx.stroke();
                ctx.fillStyle = 'white'; ctx.font = 'bold 18px Inter, Arial'; 
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; 
                ctx.fillText(answer.value, answer.x, answer.y);
            });
        }

        function drawEnemies() {
            enemies.forEach(enemy => {
                ctx.fillStyle = enemy.color;
                ctx.beginPath(); // Simple triangle shape for enemies
                ctx.moveTo(enemy.x, enemy.y + enemy.height); // Bottom point
                ctx.lineTo(enemy.x - enemy.width / 2, enemy.y); // Top-left
                ctx.lineTo(enemy.x + enemy.width / 2, enemy.y); // Top-right
                ctx.closePath();
                ctx.fill();
            });
        }

        function drawPowerups() {
            powerups.forEach(p => {
                if (!p.acquired) {
                    ctx.fillStyle = p.type === POWERUP_TYPES.SHIELD ? 'rgba(0, 255, 0, 0.7)' : 
                                    p.type === POWERUP_TYPES.ANSWER_BOMB ? 'rgba(255, 165, 0, 0.7)' : 
                                    'rgba(255, 255, 0, 0.7)'; // Green, Orange, Yellow
                    ctx.strokeStyle = '#FFFFFF';
                    ctx.lineWidth = 2;
                    drawRoundedRect(ctx, p.x - p.width/2, p.y - p.height/2, p.width, p.height, 5);
                    ctx.fill(); ctx.stroke();
                    ctx.fillStyle = 'black';
                    ctx.font = 'bold 16px Inter, Arial';
                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                    ctx.fillText(p.iconText, p.x, p.y);
                }
            });
        }

        function drawParticles() {
            particles.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function drawStars() { /* ... (same as before) ... */ 
            stars.forEach(star => {
                ctx.fillStyle = 'white'; star.opacity += (Math.random() - 0.5) * 0.1;
                star.opacity = Math.max(0.2, Math.min(1, star.opacity)); 
                ctx.globalAlpha = star.opacity; ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2); ctx.fill();
            });
            ctx.globalAlpha = 1; 
        }

        function updateShieldsDisplay() {
            shieldsDisplayEl.textContent = spaceship.shields > 0 ? `Shields: ${'🛡️'.repeat(spaceship.shields)}` : "";
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
        
        function updateParticles() {
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life--;
                if (p.life <= 0) {
                    particles.splice(i, 1);
                }
            }
        }
//x
        function update() {
            stars.forEach(star => { /* ... (star movement) ... */ 
                star.y += star.speed;
                if (star.y > canvas.height + star.size) { star.y = -star.size; star.x = Math.random() * canvas.width; }
            });
            updateParticles();

            if (currentGameState !== GAME_STATE.PLAYING) return;

            // Invincibility timer
            if (spaceship.isInvincible) {
                spaceship.invincibilityTimer -= 1000/60; // roughly 1 frame
                if (spaceship.invincibilityTimer <= 0) {
                    spaceship.isInvincible = false;
                }
            }

            // Spaceship movement
            let moveLeft = keys['ArrowLeft']; let moveRight = keys['ArrowRight'];
            if (moveLeft) spaceship.dx -= spaceship.acceleration;
            if (moveRight) spaceship.dx += spaceship.acceleration;
            if (!moveLeft && !moveRight) spaceship.dx *= spaceship.friction;
            if (Math.abs(spaceship.dx) < 0.1 && !moveLeft && !moveRight) spaceship.dx = 0;
            if (spaceship.dx > spaceship.maxSpeed) spaceship.dx = spaceship.maxSpeed;
            if (spaceship.dx < -spaceship.maxSpeed) spaceship.dx = -spaceship.maxSpeed;
            spaceship.x += spaceship.dx;
            if (spaceship.x - spaceship.width / 2 < 0) { spaceship.x = spaceship.width / 2; spaceship.dx = 0; }
            if (spaceship.x + spaceship.width / 2 > canvas.width) { spaceship.x = canvas.width - spaceship.width / 2; spaceship.dx = 0; }
            if (mouseActive) { /* ... (mouse control) ... */ 
                spaceship.x = mouseX; spaceship.dx = 0; 
                if (spaceship.x < spaceship.width / 2) spaceship.x = spaceship.width / 2;
                if (spaceship.x > canvas.width - spaceship.width / 2) spaceship.x = canvas.width - spaceship.width / 2;
                mouseActive = false; 
            }

            // Update player bullets
            bullets = bullets.filter(b => { b.y -= b.speed; return b.y > -b.radius; });
            // Update enemy bullets
            enemyBullets = enemyBullets.filter(eb => { eb.y += eb.vy; eb.x += eb.vx; return eb.y < canvas.height + eb.radius && eb.y > -eb.radius && eb.x > -eb.radius && eb.x < canvas.width + eb.radius; });


            // Update answers (move down, check off-screen)
            let correctAnsMissed = false;
            for (let i = answers.length - 1; i >= 0; i--) {
                const answer = answers[i];
                answer.y += answer.vy;
                if (answer.y - answer.height / 2 > canvas.height) {
                    if (answer.correct) correctAnsMissed = true;
                    answers.splice(i, 1);
                }
            }
            if (correctAnsMissed) {
                score += PENALTY_MISSED_CORRECT; scoreEl.textContent = `Score: ${score}`;
                if (score <= SCORE_TO_LOSE) setGameState(GAME_STATE.GAME_OVER);
                else generateProblem();
            }

            // Update Enemies (move, fire)
            const currentTime = Date.now();
            for (let i = enemies.length - 1; i >= 0; i--) {
                const enemy = enemies[i];
                enemy.y += enemy.vy;
                if (enemy.y - enemy.height / 2 > canvas.height) {
                    enemies.splice(i, 1); // Remove if off-screen
                    continue;
                }
                // Firing logic
                if (currentTime > enemy.lastFiredTime + enemy.fireRate) {
                    enemy.lastFiredTime = currentTime;
                    let bulletVx = 0;
                    let bulletVy = 5; // Default downward speed
                    if (enemy.canTarget) {
                        const angleToPlayer = Math.atan2(spaceship.y - enemy.y, spaceship.x - enemy.x);
                        bulletVx = Math.cos(angleToPlayer) * bulletVy; // Adjust speed if targeting
                        bulletVy = Math.sin(angleToPlayer) * bulletVy;
                        if (bulletVy < 2) bulletVy = 2; // Ensure minimum downward speed if targeting upwards
                    }
                    enemyBullets.push({
                        x: enemy.x, y: enemy.y + enemy.height / 2,
                        vx: bulletVx, vy: bulletVy,
                        radius: 3, color: '#FF6347' // Red enemy bullets
                    });
                }
            }
            
            // Update Powerups (move down)
            for (let i = powerups.length - 1; i >= 0; i--) {
                const p = powerups[i];
                if (!p.acquired) {
                    p.y += p.vy;
                    if (p.y - p.height / 2 > canvas.height) {
                        powerups.splice(i, 1); // Remove if off-screen
                    }
                }
            }


            // --- Collision Detection ---
            // Player bullets vs. Answers
            for (let i = bullets.length - 1; i >= 0; i--) {
                const bullet = bullets[i];
                let bulletHitSomething = false;
                for (let j = answers.length - 1; j >= 0; j--) {
                    const answer = answers[j];
                    if (checkOverlap({x:bullet.x, y:bullet.y, width:bullet.radius*2, height:bullet.radius*2}, answer)) {
                        bullets.splice(i, 1); bulletHitSomething = true;
                        if (answer.correct) {
                            score += POINTS_CORRECT_ANSWER; questionsAnsweredCorrectlyInLevel++;
                            if (spaceship.shields > 0 && questionsAnsweredCorrectlyInLevel % POWERUP_DURATION_QUESTIONS === 0) { // Check shield duration
                                // This logic needs refinement for how shield duration is tracked with powerup object
                            }
                            if (score >= SCORE_TO_WIN) setGameState(GAME_STATE.LEVEL_COMPLETE);
                            else generateProblem();
                        } else {
                            score += PENALTY_WRONG_ANSWER; answers.splice(j, 1);
                            if (answers.length === 0 || !answers.some(ans => ans.correct)) {
                                if (score > SCORE_TO_LOSE) generateProblem();
                            }
                        }
                        scoreEl.textContent = `Score: ${score}`;
                        if (score <= SCORE_TO_LOSE && currentGameState === GAME_STATE.PLAYING) setGameState(GAME_STATE.GAME_OVER);
                        break; 
                    }
                }
                if (bulletHitSomething) continue;

                // Player bullets vs. Enemies
                for (let k = enemies.length - 1; k >= 0; k--) {
                    const enemy = enemies[k];
                     if (checkOverlap({x:bullet.x, y:bullet.y, width:bullet.radius*2, height:bullet.radius*2}, enemy)) {
                        bullets.splice(i, 1); bulletHitSomething = true;
                        enemy.health--; // Assuming health system, for now 1 hit
                        if (enemy.health <= 0) {
                            enemies.splice(k, 1);
                            score += POINTS_ENEMY_DESTROYED;
                            scoreEl.textContent = `Score: ${score}`;
                            // Add explosion particles for enemy
                        }
                        break;
                    }
                }
                if (bulletHitSomething) continue;

                // Player bullets vs. Powerups
                for (let l = powerups.length - 1; l >= 0; l--) {
                    const p = powerups[l];
                    if (!p.acquired && checkOverlap({x:bullet.x, y:bullet.y, width:bullet.radius*2, height:bullet.radius*2}, p)) {
                        bullets.splice(i, 1); bulletHitSomething = true;
                        activatePowerup(p);
                        break;
                    }
                }
            }

            // Enemy bullets vs. Player
            if (!spaceship.isInvincible) {
                for (let i = enemyBullets.length - 1; i >= 0; i--) {
                    const eb = enemyBullets[i];
                    if (checkOverlap({x:eb.x, y:eb.y, width:eb.radius*2, height:eb.radius*2}, spaceship)) {
                        enemyBullets.splice(i, 1);
                        if (spaceship.shields > 0) {
                            spaceship.shields--;
                            updateShieldsDisplay();
                            spaceship.isInvincible = true; // Brief invincibility after shield hit
                            spaceship.invincibilityTimer = 1000; // 1 second
                        } else {
                            // Player hit, game over
                            setGameState(GAME_STATE.GAME_OVER);
                        }
                        break; 
                    }
                }
            }
            
            // Enemies vs. Player (physical collision)
            if (!spaceship.isInvincible) {
                for (let i = enemies.length - 1; i >= 0; i--) {
                    const enemy = enemies[i];
                    if (checkOverlap(enemy, spaceship)) {
                         if (spaceship.shields > 0) {
                            spaceship.shields--;
                            updateShieldsDisplay();
                            spaceship.isInvincible = true; 
                            spaceship.invincibilityTimer = 1500; // 1.5 seconds
                            enemies.splice(i,1); // Enemy destroyed by collision
                        } else {
                            setGameState(GAME_STATE.GAME_OVER);
                        }
                        break;
                    }
                }
            }
        }
//x
        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawStars(); 
            drawParticles();

            if (currentGameState === GAME_STATE.PLAYING) {
                drawAnswers();
                drawEnemies();
                drawPowerups();
                drawSpaceship();
                drawBullets(bullets, '#ffff00', 4); // Player bullets
                drawBullets(enemyBullets, '#FF6347', 3); // Enemy bullets
            }
        }
//x
        function gameLoop() {
            update();
            render();
            requestAnimationFrame(gameLoop);
        }
//x
        function shoot() {
            if (currentGameState !== GAME_STATE.PLAYING) return;
            bullets.push({ x: spaceship.x, y: spaceship.y, radius: 4, speed: 10, color: '#ffff00' });
        }

        function nextLevelSelection() {
            if (selectedLevelType == "PRACTICE" && selectedLevelValue <= 11) {
                selectedLevelValue = selectedLevelValue + 1;
            }
            else if (selectedLevelType == "PRACTICE" && selectedLevelValue == 12) {
                selectedLevelType="APPRENTICE";
                selectedLevelValue = null;
            }
            else if (selectedLevelType=="APPRENTICE") {
                selectedLevelType="JOURNEYMAN";
            }
            else if (selectedLevelType=="JOURNEYMAN") {
                selectedLevelType="MASTER";
            }
            setGameState(GAME_STATE.PLAYING);
        }
//x
        function setupEventListeners() {
            selectLevelBtn.addEventListener('click', () => setGameState(GAME_STATE.LEVEL_SELECT));
            settingsBtn.addEventListener('click', () => alert('Settings: Coming Soon!')); 
            backToMainMenuBtnLvl.addEventListener('click', () => setGameState(GAME_STATE.MENU));
            mainMenuFromCompleteBtn.addEventListener('click', () => setGameState(GAME_STATE.MENU));
            mainMenuFromGameOverBtn.addEventListener('click', () => setGameState(GAME_STATE.MENU));
            tryAgainBtn.addEventListener('click', () => { setGameState(GAME_STATE.PLAYING); });
            nextLevelBtn.addEventListener('click', () => {nextLevelSelection();});

            document.addEventListener('keydown', (e) => {
                if (currentGameState === GAME_STATE.PLAYING) {
                    keys[e.code] = true;
                    if (e.code === 'Space') { e.preventDefault(); shoot(); }
                }
            });
            document.addEventListener('keyup', (e) => { if (currentGameState === GAME_STATE.PLAYING) keys[e.code] = false; });
            canvas.addEventListener('mousemove', (e) => {
                if (currentGameState === GAME_STATE.PLAYING) {
                    const rect = canvas.getBoundingClientRect(); mouseX = e.clientX - rect.left; mouseActive = true;
                }
            });
            canvas.addEventListener('click', (e) => { if (currentGameState === GAME_STATE.PLAYING) shoot(); });
            window.addEventListener('resize', resizeCanvas);
        }
//x
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

        window.onload = () => {
            resizeCanvas(); populateLevelSelectMenu(); setupEventListeners(); 
            setGameState(GAME_STATE.MENU); gameLoop(); 
        };