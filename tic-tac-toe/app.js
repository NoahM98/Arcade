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

function buildInitialState() {
    // displays player name and displays whether its one player or two player

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

        console.log(`Player ${currentPlayer} wins!`);
    } else if (draw && !notDraw) {
        console.log("It's a draw!");
    }
}

// listeners
function onBoardClick(event) {
    // update state, maybe with another dozen or so helper functions...
    target = event.target;
    if (target.matches('.cell') && target.innerText === '') {
        buildInitialState();
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
