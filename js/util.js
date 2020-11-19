'use strict'

function countNegs(mat, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat.length) continue
            if (rowIdx === i && colIdx === j) continue
            count++
        }
    }
    return count
}
function countInRow(arr, symbol) {
    var count = 0
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === symbol) count++
    }
    return count
}
function countInCol(board, colIdx, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        if (board[i][colIdx] === symbol) count++
    }
    return count
}
function countInPrimaryDiag(board, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        if (board[i][i] === symbol) count++
    }
    return count
}
function countInSecondaryDiag(board, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        if (board[i][board.length - 1 - i] === symbol) count++
    }
    return count
}


function formatTime(ts) {
    var now = Date.now()
    var diff = now - ts
    if (diff >= 0 && diff <= MINUTE) return 'Just now!'
    if (diff <= MINUTE * 5) return 'Few minutes ago'
    if (diff <= HOUR * 24) return 'Today'
    if (diff <= HOUR * 48) return 'Yesterday'
    return getTimeStr(ts)
}
function getTimeStr(ts) {
    var date = new Date(ts)
    return 'At ' + date.getFullYear() + '-' +
        (date.getMonth() + 1) +
        '-' + date.getDate() +
        '  Time: ' + date.getHours() + ':' + date.getMinutes()
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getEmptyCells() {
    var emptyBoardCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === '') {
                emptyBoardCells.push({ i: i, j: j })
            }
        }
    }
    return emptyBoardCells;
}


function displayCell(cellCoord) {
    var cell = gBoard[cellCoord.i][cellCoord.j];
    cell.isShown = true;
    var elCell = document.querySelector(`.cell-${cellCoord.i}-${cellCoord.j}`);
    elCell.classList.add('selected');
    elCell.innerText = cell.isMine ? MINE : (cell.minesaroundcount ? cell.minesaroundcount : '');
}

function displayCells(i, j) {
    var cell = gBoard[i][j];
    if (!cell.isShown) {
        displayCell({ i, j })
        if (!cell.isMine) gGame.shownCount++;
        if (!cell.minesaroundcount && !cell.isMine) {
            expandShown(i, j)
            console.log(cell)
        }
    }
}


function firstClick() {

    // gTimeInterval = setInterval(gameTimer, 10);
    gBoard = buildBoard(gBoard);
    countMinesAroundNeighs(gBoard)
    
}


function revealMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) displayCell({ i, j })
        }
    }
    console.log('are you revealing a mine?' , gBoard[i][j].isMine)
}

function selectCell(elCell, i, j) {
    var cell = gBoard[i][j]

    if (!gGame.isOn) return;
    if (cell.isMarked) return;
    if (gFirstClick) { 
        // firstClick()
    }

    gFirstClick = false

    if (cell.isShown) { 
        // displayCells(i, j)  

        if (cell.isMine) {
            // checkGameOver()
            // revealMines()
        }
    }

}