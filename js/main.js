'use strict';
const FLAG = '🇮🇱';
const GAMEFACE = '🧑🏼‍🚀';
const WINFACE = '🤩';
const LOSEFACE = '🥶';
const HINT = '🔭';
const MINE = '💥';
const EMPTY = ' ';

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
}
var gLevel = {
    size: 4,
    mines: 2
};


var gBoard;
var gFirstClick = true

function initGame() {

    gGame.isOn = true;
    gBoard = buildBoard();
    placeMines(gBoard)
    countMinesAroundNegs(gBoard)
    checkMinesAroundNegs(gBoard)
    gFirstClick = true;
    renderBoard(gBoard)
}


function renderBoard(board) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var cellContent = (cell.isMine) ? MINE : cell.minesaroundcount;
            var cellClass = `hidden cell-${i}-${j}`;
            strHTML += `<td class = "cell ${cellClass}" 
            onclick="cellClicked(this,${i},${j})"
            oncontextmenu ="cellMarked(this,${i},${j})"> `
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    var elGame = document.querySelector('.board');
    elGame.innerHTML = strHTML
}

function buildBoard() {
    var board = [];
    var level = gLevel.size
    for (var i = 0; i < level; i++) {
        board[i] = [];
        for (var j = 0; j < level; j++) {
            var cell = {
                minesaroundcount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
            board[i][j] = cell;
        }
    };
    console.table(board)
    return board;
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min); // Min is inclusive, Max is Exclusive
}
