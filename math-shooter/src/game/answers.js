// This file handles the generation and management of answer objects that fall from the top of the screen, including correct and incorrect answers.

const answers = [];

function generateAnswer(correctValue, width, height) {
    const answer = {
        value: correctValue,
        x: Math.random() * (canvas.width - width) + width / 2,
        y: 0 - height / 2,
        vy: (canvas.height + height) / (ANSWER_TRAVEL_TIME_SECONDS * 60), // Speed based on travel time
        width: width,
        height: height,
        correct: true // This will be set to false for incorrect answers
    };
    return answer;
}

function generateDistractorAnswer(correctValue, usedValues, width, height) {
    let wrongAnswerValue;
    do {
        const offset = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 5) + 1);
        wrongAnswerValue = correctValue + offset * (Math.random() < 0.3 ? 1 : (Math.random() < 0.6 ? 2 : (Math.floor(Math.random() * 5) + 1)));
    } while (usedValues.has(wrongAnswerValue) || wrongAnswerValue <= 0 || wrongAnswerValue > 144);
    
    const answer = {
        value: wrongAnswerValue,
        x: Math.random() * (canvas.width - width) + width / 2,
        y: 0 - height / 2,
        vy: (canvas.height + height) / (ANSWER_TRAVEL_TIME_SECONDS * 60),
        width: width,
        height: height,
        correct: false
    };
    return answer;
}

function resetAnswers() {
    answers.length = 0; // Clear existing answers
}

function addAnswer(answer) {
    answers.push(answer);
}

function getAnswers() {
    return answers;
}

export { generateAnswer, generateDistractorAnswer, resetAnswers, addAnswer, getAnswers };