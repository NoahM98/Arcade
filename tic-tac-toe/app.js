// state
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

// render
function renderState() {
    const cellValue = document.createElement('div');
    cellValue.innerText = currentPlayer;
    const clickedCell = document.getElementById(target.id);
    clickedCell.appendChild(cellValue);
}

function updateBoard() {

}

// maybe a dozen or so helper functions for tiny pieces of the interface

// listeners
function onBoardClick(event) {
    // update state, maybe with another dozen or so helper functions...
    target = event.target;
    if (target.matches('.cell') && target.innerText === '') {
        updateBoard();
        renderState(); // show the user the new state
    }
}
const board = document.getElementById('game-board');
board.addEventListener('click', onBoardClick); // etc
