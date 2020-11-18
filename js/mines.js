'use strict';


function placeMines(board) {
    var mines = gLevel.mines
    var currCell = 0;
    for (var i = 0; i < mines; i++) {
        var randRow = getRandomInt(0, gLevel.size)
        var randCol = getRandomInt(0, gLevel.size)
        var cell = board[randRow][randCol]
        if (randRow === currCell.i && randCol === currCell.j) {
            mines++
            continue;
        }
        if (cell.isMine) mines++
        // console.log(mines)
        cell.isMine = true
        cell.minesaroundcount = MINE;
    }
}

function countMinesAroundNegs(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var neighborsSum = checkMinesAroundNegs(board, i, j)
            var cell = board[i][j]
            cell.minesaroundcount = checkMinesAroundNegs(board, i, j)
            // console.log(cell)
            cell.minesaroundcount = (neighborsSum === 0) ? ' ' : neighborsSum;
        }
    }
    
}


function checkMinesAroundNegs(mat, cellI, cellJ) {
    var counter = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[0].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (mat[i][j].isMine) counter++;
        }
    }
    return counter;
}
