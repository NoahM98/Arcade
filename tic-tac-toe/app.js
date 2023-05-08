let state = {
    player1: 'x',
    player2: 'o',
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

let currentPlayer;

const select = document.getElementById('oneP-twoP');

const playerBoxOne = document.getElementById('playerBox1');
const playerOne = document.getElementById('player-one');
const playerNameOne = document.createElement('h2');

const playerBoxTwo = document.getElementById('playerBox2');
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

function decideWhoseFirst() {
    let decision = Math.floor(Math.random() * 2) + 1;
    if (decision === 1) {
        currentPlayer = state.player1;
    } else if (decision === 2) {
        currentPlayer = state.player2;
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

function haveComputerPlay() {
    let firstIndex = Math.floor(Math.random() * 3);
    let secondIndex = Math.floor(Math.random() * 3);
    while (state.board[firstIndex][secondIndex]) {
        firstIndex = Math.floor(Math.random() * 3);
        secondIndex = Math.floor(Math.random() * 3);
    }
    state.board[firstIndex].splice([secondIndex], 1, currentPlayer);
    const cellValue = document.createElement('div');
    cellValue.innerText = currentPlayer;
    const computerChoice = document.getElementById('index' + firstIndex + secondIndex);
    computerChoice.appendChild(cellValue);
    checkWinConditions();
    if (!hasEnded) {
        currentPlayer = state.player1;
        highlightPlayer();
    }
}

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
        if (currentPlayer === state.player1) {
            gameOverPopup.innerText = playerNameOne.innerText + ' has won!';
        } else if (currentPlayer === state.player2) {
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

function highlightPlayer() {
    if (currentPlayer === state.player1) {
        playerBoxOne.classList.add('highlight');
        playerBoxTwo.classList.remove('highlight');
    } else if (currentPlayer === state.player2) {
        playerBoxOne.classList.remove('highlight');
        playerBoxTwo.classList.add('highlight');
    }
}

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
let hasEnded = false;
function onStart() {
    if (!hasStarted) {
        buildInitialState();
        decideWhoseFirst();
        highlightPlayer();
        hasStarted = true;
        if (isOnePlayer && currentPlayer === state.player2) {
            setTimeout(haveComputerPlay, 1000);
        }
    }
}
const startButton = document.getElementById('start');
startButton.addEventListener('click', onStart);

function onReset() {
    if (hasStarted) {
        for (let i = 0; i < state.board.length; i++) {
            for (let j = 0; j < state.board[i].length; j++) {
                state.board[i].splice(j, 1, null);
                let currentCell = document.getElementById('index' + i + j);
                if (currentCell.firstChild) {
                    currentCell.removeChild(currentCell.firstChild);
                }
            }
        }
        gameOverPopup.innerText = '';
        gameOverPopup.style.display = 'none';
        if (currentPlayer === state.player1) {
            playerBoxOne.classList.remove('highlight');
        } else if (currentPlayer === state.player2) {
            playerBoxTwo.classList.remove('highlight');
        }
        playerBoxOne.removeChild(playerBoxOne.children[1]);
        playerBoxTwo.removeChild(playerBoxTwo.children[1]);
        select.value = '1-player';
        hasStarted = false;
        hasEnded = false;
        isOnePlayer = true;
    }
}
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', onReset);

function onBoardClick(event) {
    target = event.target;
    if (target.matches('.cell') && target.innerText === '' && hasStarted && !hasEnded && ((isOnePlayer && currentPlayer !== state.player2) || !isOnePlayer)) {
        renderState();
        updateBoard();
        checkWinConditions();
        if (currentPlayer === state.player1 && !hasEnded) {
            currentPlayer = state.player2;
        } else if (currentPlayer === state.player2 && !hasEnded) {
            currentPlayer = state.player1;
        }
        if (!hasEnded) {
            highlightPlayer();
        }
        if (isOnePlayer && !hasEnded) {
            setTimeout(haveComputerPlay, 1000);
        }
    }
}
const board = document.getElementById('game-board');
board.addEventListener('click', onBoardClick);
