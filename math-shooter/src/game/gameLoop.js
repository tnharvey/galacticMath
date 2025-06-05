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

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

export { gameLoop };