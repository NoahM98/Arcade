const state = {
    currentPlayer: 0,
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
    // console.log(individuleCup);
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            let squareCell = document.createElement('div');
            // squareCell.classList.add('gem-cell');
            squareCell.setAttribute('id', `c${x}${y}${i}${j}`);
            // console.log(squareCell);
            individuleCup.appendChild(squareCell);
        }
    }
}

function specifyCup() {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 6; j++) {
            makeCupSquares(i, j);
        }
    }
}

specifyCup();

function makeMancalaSquares() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            let squareCell = document.createElement('div');
            // squareCell.classList.add('gem-cell');
            squareCell.setAttribute('id', `m1${i}${j}`);
            // console.log(squareCell);
            playerOneMancala.appendChild(squareCell);
        }
    }
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            let squareCell = document.createElement('div');
            // squareCell.classList.add('gem-cell');
            squareCell.setAttribute('id', `m2${i}${j}`);
            // console.log(squareCell);
            playerTwoMancala.appendChild(squareCell);
        }
    }
}

function supplyGems() {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 6; j++) {
            let gem1 = document.getElementById(`c${i}${j}21`);
            let gem2 = document.getElementById(`c${i}${j}22`);
            let gem3 = document.getElementById(`c${i}${j}31`);
            let gem4 = document.getElementById(`c${i}${j}32`);
            gem1.classList.add('gem');
            gem2.classList.add('gem');
            gem3.classList.add('gem');
            gem4.classList.add('gem');
        }
    }
}

function buildInitialState() {
    makeMancalaSquares();
    supplyGems();
}

buildInitialState();
