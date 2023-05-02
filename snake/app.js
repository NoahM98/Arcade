let snake = {
    body: [[10, 5], [10, 6], [10, 7], [10, 8]],
    nextDirection: [1, 0]
};

let state = {
    apple: [11, 8],
    snake: snake
};

const board = document.getElementById('board');
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

function buildInitialState() {

}

function renderState() {
    // show the user the new state

}

// maybe a dozen or so helper functions for tiny pieces of the interface

// listeners
function onBoardClick() {
    // update state, maybe with another dozen or so helper functions...

    renderState()
}

// board.addEventListener('click', onBoardClick);

function tick() {
    // this is an incremental change that happens to the state every time you update...

    renderState()
}

setInterval(tick, 1000 / 30) // as close to 30 frames per second as possible

// now you might have things like
document.addEventListener('keydown', function (event) {
    // here you might read which key was pressed and update the state accordingly
})
