let snake = {
    body: [[10, 5], [10, 6], [10, 7], [10, 8], [10, 9]],
    nextDirection: [0, 1]
};

let state = {
    apple: [10, 15],
    snake: snake
};

let hasStarted = false;
let hasEnded = false;
let hasHitItself = false;
let score = 0;
let lastRemoved;
let appleEaten = false;
let appleError = false;
let appleX = state.apple[0];
let appleY = state.apple[1];
let highScore = 0;
let difficulty = 250;

const board = document.getElementById('board');
const startButton = document.getElementById('game-start');
const gameDifficulty = document.getElementById('game-difficulty');
const scoreDisplay = document.getElementById('score-display');
const highScoreDisplay = document.getElementById('high-score-display');
const gameOverPopup = document.getElementById('game-over');

// creating the board
function makeBoard() {
    for (let i = 0; i < 20; i++) {
        const row = document.createElement('tr');
        board.appendChild(row);
        for (let j = 0; j < 20; j++) {
            let cell = document.createElement('td');
            row.appendChild(cell);
            let newId;
            if (i < 10 && j < 10) {
                newId = 'index' + '0' + i + '0' + j;
            } else if (i < 10) {
                newId = 'index' + '0' + i + j;
            } else if (j < 10) {
                newId = 'index' + i + '0' + j;
            } else {
                newId = 'index' + i + j;
            }
            cell.setAttribute('id', newId);
            cell.classList.add('cell');
        }
    }
}
makeBoard();

function newSnakeBody(el) {
    let snakeCell;
    if (el[0] < 10 && el[1] < 10) {
        snakeCell = document.getElementById('index' + '0' + el[0] + '0' + el[1]);
    } else if (el[0] < 10) {
        snakeCell = document.getElementById('index' + '0' + el[0] + el[1]);
    } else if (el[1] < 10) {
        snakeCell = document.getElementById('index' + el[0] + '0' + el[1]);
    } else {
        snakeCell = document.getElementById('index' + el[0] + el[1]);
    }
    snakeCell.classList.add('snakeBody');
}

function renderState(removed) {
    // show the user the new state
    snake.body.forEach(newSnakeBody);
    if (removed) {
        let oldCell;
        if (removed[0] < 10 && removed[1] < 10) {
            oldCell = document.getElementById('index' + '0' + removed[0] + '0' + removed[1]);
        } else if (removed[0] < 10) {
            oldCell = document.getElementById('index' + '0' + removed[0] + removed[1]);
        } else if (removed[1] < 10) {
            oldCell = document.getElementById('index' + removed[0] + '0' + removed[1]);
        } else {
            oldCell = document.getElementById('index' + removed[0] + removed[1]);
        }
        oldCell.classList.remove('snakeBody');
    }
}

function renderApple() {
    let apl = state.apple;
    let newApple;
    if (apl[0] < 10 && apl[1] < 10) {
        newApple = document.getElementById('index' + '0' + apl[0] + '0' + apl[1]);
    } else if (apl[0] < 10) {
        newApple = document.getElementById('index' + '0' + apl[0] + apl[1]);
    } else if (apl[1] < 10) {
        newApple = document.getElementById('index' + apl[0] + '0' + apl[1]);
    } else {
        newApple = document.getElementById('index' + apl[0] + apl[1]);
    }
    newApple.classList.add('apple');
}

function buildInitialState() {
    renderState();
    renderApple();
}
buildInitialState();

function moveSnake() {
    const removedCell = snake.body.shift();
    const newCell = snake.body[snake.body.length - 1].map((el, ind) => {
        return el + snake.nextDirection[ind];
    })
    snake.body.push(newCell);
    return removedCell;
}

function newAppleCheck(el) {
    if (el[0] === appleX && el[1] === appleY) {
        appleError = true;
        console.log('Apple Error: ' + appleError);
    }
}

function moveApple() {
    appleX = Math.floor(Math.random() * 20);
    appleY = Math.floor(Math.random() * 20);
    snake.body.forEach(newAppleCheck);
    while (appleError) {
        appleError = false;
        appleX = Math.floor(Math.random() * 20);
        appleY = Math.floor(Math.random() * 20);
        snake.body.forEach(newAppleCheck);
    }
    appleError = false;
    state.apple = [appleX, appleY];
}

function removeAppleClass() {
    let apl = state.apple;
    let oldApple;
    if (apl[0] < 10 && apl[1] < 10) {
        oldApple = document.getElementById('index' + '0' + apl[0] + '0' + apl[1]);
    } else if (apl[0] < 10) {
        oldApple = document.getElementById('index' + '0' + apl[0] + apl[1]);
    } else if (apl[1] < 10) {
        oldApple = document.getElementById('index' + apl[0] + '0' + apl[1]);
    } else {
        oldApple = document.getElementById('index' + apl[0] + apl[1]);
    }
    oldApple.classList.remove('apple');
}

function hasEatenApple() {
    let head = snake.body[snake.body.length - 1];
    if (head[0] === state.apple[0] && head[1] === state.apple[1]) {
        snake.body.unshift(lastRemoved);
        appleEaten = true;
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.innerText = `High Score: ${highScore}`;
        }
        removeAppleClass();
        moveApple();
    }
}

function checkForSelfHit(el, ind) {
    let head = snake.body[snake.body.length - 1];
    if (el[0] === head[0] && el[1] === head[1] && ind !== snake.body.length - 1) {
        hasHitItself = true;
    }
}

function hasGameEnded() {
    let body = snake.body;
    let head = body.length - 1;
    body.forEach(checkForSelfHit);
    if (body[head][0] >= 20 || body[head][1] >= 20 ||
        body[head][0] < 0 || body[head][1] < 0 || hasHitItself) {
        console.log('Game Over');
        gameOverPopup.style.display = 'inline-block';
        hasEnded = true;
    }
}

// listeners

function startGame() {
    if (!hasStarted) {
        setInterval(tick, difficulty);
    }
    hasStarted = true;
}
startButton.addEventListener('click', startGame);

function changeDifficulty(event) {
    if (event.target.value === 'easy') {
        difficulty = 250;
    } else if (event.target.value === 'medium') {
        difficulty = 200;
    } else if (event.target.value === 'hard') {
        difficulty = 150;
    } else if (event.target.value === 'expert') {
        difficulty = 100;
    }
}
gameDifficulty.addEventListener('change', changeDifficulty);

function tick() {
    // this is an incremental change that happens to the state every time you update...
    if (hasStarted && !hasEnded) {
        lastRemoved = moveSnake();
        hasGameEnded();
        hasEatenApple();
        if (!hasEnded && appleEaten) {
            renderState();
            renderApple();
            appleEaten = false;
        } else if (!hasEnded) {
            renderState(lastRemoved);
            renderApple();
        }
    }
}

function arrowDown(event) {
    if (event.key === 'ArrowUp') {
        snake.nextDirection = [-1, 0];
        console.log('up arrow pressed');
    } else if (event.key === 'ArrowDown') {
        snake.nextDirection = [1, 0];
        console.log('down arrow pressed');
    } else if (event.key === 'ArrowLeft') {
        snake.nextDirection = [0, -1];
        console.log('left arrow pressed');
    } else if (event.key === 'ArrowRight') {
        snake.nextDirection = [0, 1];
        console.log('right arrow pressed');
    }
}
document.addEventListener('keydown', arrowDown);
