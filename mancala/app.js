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

// function makeCupSquares() {
//     for (let i = 0; i < 6; i++) {
//         for (let j = 0; j < 6; j++) {
//             let individuleCup = document.getElementById(`index${i}${j}`);
//             console.log(individuleCup);
//             for (let k = 0; k < 6; k++) {
//                 for (let l = 0; l < 4; l++) {
//                     let squareCell = document.createElement('div');
//                     squareCell.classList.add('gem-cell');
//                     squareCell.setAttribute('id', `g${k}${l}`);
//                     console.log(squareCell);
//                     individuleCup.appendChild(squareCell);
//                 }
//             }
//         }
//     }
// }
// makeCupSquares();

// function makeMancalaSquares() {
//     for (let i = 1; i < 3; i++) {

//     }
// }
