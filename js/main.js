'use strict';
//CONSTS: 
const FLAG = '🇮🇱';
const GAMEFACE = '🧑🏼‍🚀';
const WINFACE = '🤩';
const LOSEFACE = '🥶';
const HINT = '💫';
const MINE = '💥';
const LIFE = '👽'
const EMPTY = ' ';

//GLOBAL VARS:
var gBoard;
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
}
var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gFirstClick = true
var gTimeInterval;
var gStartTime;
var gLastScore;

//ELEMENT GRAB AREA:
var gElSmiley = document.querySelector('.restartButton');


//HINT AREA:
var gIsHint = false;
var gHints = [];

//LIVES AREA:
var gLives = 3;


function easyLevel() {
    gLevel.SIZE = 4;
    gLevel.MINES = 2
    initGame()
}

function mediumLevel() {
    gLevel.SIZE = 8
    gLevel.MINES = 12
    initGame()
}
function hardLevel() {
    gLevel.SIZE = 12;
    gLevel.MINES = 30;
    initGame()
}

function restartGame() {
    if (gTimeInterval) clearInterval(gTimeInterval);
    gTimeInterval = null;
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = '0';
    elTimer.style.fontSize = '25px';
    gStartTime = 0;
    gLives = 3;
    gFirstClick = true;
}

function initGame() {
    restartGame()
    closeModal()
    gGame.isOn = true;
    gBoard = buildBoard();
    placeMines(gBoard)
    countMinesAroundNegs(gBoard)
    gElSmiley.innerText = GAMEFACE;
    createHints()
    renderLives()
    renderBoard(gBoard)
}


function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var cellContent = (cell.isMine) ? MINE : cell.minesaroundcount;
            var cellClass = `hidden`;
            strHTML += `<td class = "cell ${cellClass} cell-${i}-${j}" 
            onclick = "cellClicked(this,${i},${j})"
            oncontextmenu = "cellMarked(this,${i},${j})"> `
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    var elGame = document.querySelector('.board');
    elGame.innerHTML = strHTML
}

function buildBoard() {
    var board = [];
    var level = gLevel.SIZE
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

//IS THE GAME OVER AREA:

//this function only checks for a win because a loss is defined by stepping on a mine
function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j]
            if (!cell.isShown && !cell.isMine || !cell.isMarked && cell.isMine && !cell.isShown) return;
        }
    }
    gameOver(true)
}

function gameOver(isWin) {
    gGame.isOn = false;
    clearInterval(gTimeInterval)
    if (!isWin) {
        var elModal = document.querySelector('.modal');
        var elModalTitle = document.querySelector('h3 span')
        displayAllMines(gBoard);
        console.log('YOU LOST')
        elModal.style.display = 'block';
        elModalTitle.innerText = 'You lost';
        gElSmiley.innerText = LOSEFACE;
    }
    else if (isWin) {
        var elModal = document.querySelector('.modal');
        var elModalTitle = document.querySelector('h3 span')
        console.log('VICTORY')
        elModal.style.display = 'block';
        elModalTitle.innerText = 'You won!';
        gElSmiley.innerText = WINFACE;
    }
}

function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}

//MAKING HINTS:
function createHints() {
    var hints = 3;
    for (var i = 0; i < hints; i++) {
        gHints.push(i)
    }
    renderHints(hints)
}

function renderHints(hints) {
    var strHTML = ''
    for (var i = 0; i < hints; i++) {
        strHTML += `<button class="hints${i}" onclick="giveHint(this,${i})">${HINT}</button>`
    }
    var elHints = document.querySelector('.hints')
    elHints.innerHTML = strHTML
}

function giveHint(elHint, i) {
    if (!gHints.includes(i)) return;
    gHints.splice(i, 1);
    gIsHint = true;
    elHint.style.backgroundColor = "#12131b";
    elHint.onclick = '';
}

function checkNegsForHint(cellI, cellJ, board) {
    var shownHints = [];
    var hintCell = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            hintCell++
            var currCell = board[i][j]
            if (currCell.isShown === true) {
                shownHints.push(currCell)
                continue
            }
            currCell.isShown = true;
            var elCell = document.querySelector(`.cell-${i}-${j}`);
            elCell.classList.remove('hidden')
            elCell.innerText = currCell.isMine ? MINE : (currCell.minesaroundcount ? currCell.minesaroundcount : EMPTY);
        }
    }
    console.log('shownHints', shownHints)
    setTimeout(removeHint, 2000, cellI, cellJ, board, shownHints)

}

function removeHint(cellI, cellJ, board, shownHints) {
    var hintCell = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            hintCell++
            var currCell = board[i][j]
            if (shownHints.includes(currCell)) continue;
            currCell.isShown = false;
            var elCell = document.querySelector(`.cell-${i}-${j}`);
            elCell.classList.add('hidden')
            elCell.innerText = ' ';
        }
    }
    gIsHint = false;
}

//MAKING A TIMER: 
function startTimer() {
    gStartTime = Date.now();
    gTimeInterval = setInterval(timeCounter, 30);
    var elTimeLog = document.querySelector('.timer');
    elTimeLog.style.fontSize = '25px';
}

function timeCounter() {
    var currTime = Date.now();
    var elTimeCounter = document.querySelector('.timer');
    var timePassed = currTime - gStartTime;
    var secondsPassed = (timePassed / 1000).toFixed();
    elTimeCounter.innerText = `${secondsPassed}`;
}

//MAKING LIVES:
function renderLives() {
    var strHTML = ''
    for (var i = 0; i < gLives; i++) {
        strHTML += `<button class="lives${i}">${LIFE}</button>`
    }
    var elLives = document.querySelector('.lives')
    elLives.innerHTML = strHTML
}


//THE MOST USEFUL FUNCTION IN THE WHOLE INTERNET: 
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min); // Min is inclusive, Max is Exclusive
}
