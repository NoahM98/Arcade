let state = {
    player1: 'x',
    player2: 'o',
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

let currentPlayer = state.player1;

const playerOne = document.getElementById('player-one');
const playerNameOne = document.createElement('h2');

const playerTwo = document.getElementById('player-two');
const playerNameTwo = document.createElement('h2');

const gameOverPopup = document.getElementById('game-over')

function buildInitialState() {
    if (isOnePlayer) {
        playerNameOne.innerText = prompt('Please enter your name');
        playerOne.after(playerNameOne);
        playerNameTwo.innerText = 'Computer';
        playerTwo.after(playerNameTwo);
    } else {
        playerNameOne.innerText = prompt("Please enter Player 1's name");
        playerOne.after(playerNameOne);
        playerNameTwo.innerText = prompt("Please enter Player 2's name");
        playerTwo.after(playerNameTwo);
    }
}

function renderState() {
    const cellValue = document.createElement('div');
    cellValue.innerText = currentPlayer;
    const clickedCell = document.getElementById(target.id);
    clickedCell.appendChild(cellValue);
}

function updateBoard() {
    state.board[target.id[5]].splice(target.id[6], 1, currentPlayer);
}

let hasEnded = false;
function checkWinConditions() {
    let board = state.board;
    let draw;
    let notDraw;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== null) {
                draw = true;
            } else {
                notDraw = true;
            }
        }
    }
    if ((board[0][0] === board[0][1] && board[0][0] === board[0][2] && board[0][0] !== null) ||
        (board[1][0] === board[1][1] && board[1][0] === board[1][2] && board[1][0] !== null) ||
        (board[2][0] === board[2][1] && board[2][0] === board[2][2] && board[2][0] !== null) ||
        (board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] !== null) ||
        (board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] !== null) ||
        (board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] !== null) ||
        (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== null) ||
        (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== null)) {

        hasEnded = true;
        if (currentPlayer === 'x') {
            gameOverPopup.innerText = playerNameOne.innerText + ' has won!';
        } else if (currentPlayer === 'o') {
            gameOverPopup.innerText = playerNameTwo.innerText + ' has won!';
        }
        gameOverPopup.style.display = 'inline-block';

    } else if (draw && !notDraw) {
        console.log("It's a draw!");
        hasEnded = true;
        gameOverPopup.innerText = "It's a draw!";
        gameOverPopup.style.display = 'inline-block';
    }
}

// highlight current player ******************
// clearly who has won or if it was a draw ******************

// listeners
let isOnePlayer = true;
function numOfPlayers(event) {
    if (event.target.value === '1-player') {
        isOnePlayer = true;
    } else if (event.target.value === '2-player') {
        isOnePlayer = false;
    }
}
const selectPlayers = document.getElementById('oneP-twoP');
selectPlayers.addEventListener('change', numOfPlayers)

let hasStarted = false;
function onStart() {
    // have the computer choose randomly who goes first *****************
    buildInitialState();
    hasStarted = true;
}
const startButton = document.getElementById('start');
startButton.addEventListener('click', onStart);

function onReset() {
    // have a way to reset when the reset button is clicked
}
const resetButton = document.getElementById('reset');
// resetButton.addEventListener('click',)

function onBoardClick(event) {
    // add a way for the computer to either randomly or intelligently choose where to place their mark *******************
    target = event.target;
    if (target.matches('.cell') && target.innerText === '' && hasStarted && !hasEnded) {
        renderState();
        updateBoard();
        checkWinConditions();
        if (currentPlayer === state.player1) {
            currentPlayer = state.player2;
        } else if (currentPlayer === state.player2) {
            currentPlayer = state.player1;
        }
    }
}
const board = document.getElementById('game-board');
board.addEventListener('click', onBoardClick); // etc
