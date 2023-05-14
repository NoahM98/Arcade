const state = {
    currentPlayer: 1,
    board: [
        [4, 4, 4, 4, 4, 4, 0],
        [4, 4, 4, 4, 4, 4, 0]
    ]
}

const board = state.board;

const gameBoard = document.getElementById('game-board');
const playerCups = document.getElementById('player-cups');
const playerOneMancala = document.getElementById('player1-mancala');
const playerTwoMancala = document.getElementById('player2-mancala');

function makeCupSquares(x, y) {
    let individuleCup = document.getElementById(`index${x}${y}`);
    for (let i = 1; i <= 24; i++) {
        let squareCell = document.createElement('div');
        squareCell.classList.add('gem-cell');
        squareCell.setAttribute('id', `c${x}${y}${i}`);
        individuleCup.appendChild(squareCell);
    }
}

function specifyCup() {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 6; j++) {
            makeCupSquares(i, j);
        }
    }
}

function makeMancalaSquares() {
    for (let i = 1; i <= 40; i++) {
        let squareCell = document.createElement('div');
        squareCell.classList.add('gem-cell');
        squareCell.setAttribute('id', `m1${i}`);
        playerOneMancala.appendChild(squareCell);
    }
    for (let i = 1; i <= 40; i++) {
        let squareCell = document.createElement('div');
        squareCell.classList.add('gem-cell');
        squareCell.setAttribute('id', `m2${i}`);
        playerTwoMancala.appendChild(squareCell);
    }
}

function generatePlayer1Gems(el, ind) {
    for (let i = 1; i <= el; i++) {
        if (ind !== 6) {
            let gem = document.getElementById(`c0${ind}${i}`);
            gem.classList.add('gem');
        } else {
            let gem = document.getElementById(`m1${i}`);
            gem.classList.add('gem');
        }
    }
}

function generatePlayer2Gems(el, ind) {
    for (let i = 1; i <= el; i++) {
        if (ind !== 6) {
            let gem = document.getElementById(`c1${ind}${i}`);
            gem.classList.add('gem');
        } else {
            let gem = document.getElementById(`m2${i}`);
            gem.classList.add('gem');
        }
    }
}

function renderGems() {
    board[0].forEach(generatePlayer1Gems);
    board[1].forEach(generatePlayer2Gems);
}

function buildInitialState() {
    specifyCup();
    makeMancalaSquares();
    renderGems();
}

buildInitialState();

function updateState(event) {
    if (event.target.className === 'cup') {
        let target = event.target.id;
        console.log(target);
        console.log(board[target[5]][target[6]]);
        let moveX = parseInt(target[6]) + 1;
        let moveY = parseInt(target[5]);
        let currentEl = document.getElementById(target);
        while (board[target[5]][target[6]] !== 0) {
            if (moveX > 6 && moveY === 0) {
                moveX = 0;
                moveY = 1;
            } else if (moveX > 6 && moveY === 1) {
                moveX = 0;
                moveY = 0;
            }
            // console.log(moveX);
            // console.log(moveY);
            board[moveY][moveX]++
            moveX++;
            let gemToRemove = currentEl.getElementsByClassName('gem')[board[target[5]][target[6]] - 1];
            // console.log(gemToRemove);
            gemToRemove.classList.remove('gem');
            board[target[5]][target[6]]--;
            renderGems();
        }
    } else if (event.target.className === 'gem-cell' || event.target.className === 'gem-cell gem') {
        let target = event.target.parentElement.id;
        console.log(target);
        console.log(board[target[5]][target[6]]);
        let moveX = parseInt(target[6]) + 1;
        let moveY = parseInt(target[5]);
        let currentEl = document.getElementById(target);
        while (board[target[5]][target[6]] !== 0) {
            if (moveX > 6 && moveY === 0) {
                moveX = 0;
                moveY = 1;
            } else if (moveX > 6 && moveY === 1) {
                moveX = 0;
                moveY = 0;
            }
            // console.log(moveX);
            // console.log(moveY);
            board[moveY][moveX]++
            moveX++;
            let gemToRemove = currentEl.getElementsByClassName('gem')[board[target[5]][target[6]] - 1];
            // console.log(gemToRemove);
            gemToRemove.classList.remove('gem');
            board[target[5]][target[6]]--;
            renderGems();
        }
    }
}

function boardClick(event) {
    updateState(event);
}

playerCups.addEventListener('click', boardClick);
