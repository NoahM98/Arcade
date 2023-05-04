let snake = {
    body: [[10, 5], [10, 6], [10, 7], [10, 8]],
    nextDirection: [0, 1]
};

let state = {
    apple: [11, 8],
    snake: snake
};

const board = document.getElementById('board');
const startButton = document.getElementById('gameStart');

// creating the board
function makeBoard() {
    for (let i = 0; i < 20; i++) {
        const row = document.createElement('tr');
        board.appendChild(row);
        for (let j = 0; j < 20; j++) {
            let cell = document.createElement('td');
            row.appendChild(cell);
            let newId = 'index' + i + j;
            cell.setAttribute('id', newId);
            cell.classList.add('cell');
        }
    }
}
makeBoard();

function newSnakeBody(el) {
    let snakeCell = document.getElementById('index' + el[0] + el[1]);
    console.log(snakeCell);
    snakeCell.classList.add('snakeBody');
}

function renderState(removed) {
    // show the user the new state
    snake.body.forEach(newSnakeBody);
    if (removed) {
        console.log(removed);
        // removedClass.forEach(oldSnakeBody);
        let oldCell = document.getElementById('index' + removed[0] + removed[1]);
        oldCell.classList.remove('snakeBody');
    }
}

function buildInitialState() {
    renderState();
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

// maybe a dozen or so helper functions for tiny pieces of the interface

// listeners

let hasStarted = false;
function startGame() {
    hasStarted = true;
}
startButton.addEventListener('click', startGame);

// Don't know if I need this yet...
// function onBoardClick() {
//     // update state, maybe with another dozen or so helper functions...

//     renderState()
// }
// board.addEventListener('click', onBoardClick);

function tick() {
    // this is an incremental change that happens to the state every time you update...
    if (hasStarted) {
        let removedClass = moveSnake();
        renderState(removedClass);
    }
}


setInterval(tick, 1000) // as close to 30 frames per second as possible


// now you might have things like
document.addEventListener('keydown', function (event) {
    // here you might read which key was pressed and update the state accordingly
})
