'use strict';


function placeMines(board,currCell = 0) {
    var mines = gLevel.MINES
    for (var i = 0; i < mines; i++) {
        var randRow = getRandomInt(0, gLevel.SIZE)
        var randCol = getRandomInt(0, gLevel.SIZE)
        var cell = board[randRow][randCol]
        if (randRow === currCell.i && randCol === currCell.j) {
            mines++
            continue;
        }
        if (cell.isMine) mines++
        cell.isMine = true
        cell.minesaroundcount = MINE;
    }
}

function countMinesAroundNegs(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var neighborsSum = checkMinesAroundNegs(board, i, j)
            var cell = board[i][j]
            cell.minesaroundcount = (neighborsSum === 0) ? ' ' : neighborsSum;
        }
    }  
}

function checkMinesAroundNegs(board, cellI, cellJ) {
    var counter = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            var currCell = board[i][j]
            if (j < 0 || j >= board[0].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (currCell.isMine) counter++;
        }
    }
    return counter;
}

function displayAllMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            if (cell.isMine) {
                displayCell(i,j)
            }
        }
    }
}