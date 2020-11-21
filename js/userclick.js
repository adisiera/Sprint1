'use strict';

function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return
    var cell = gBoard[i][j]
    if (cell.isMarked) return
    if (gFirstClick) {
        startTimer();
        if (cell.isMine) {
            //This set of actions ensures the game re-renders if we enter this condition:
            var currCell = { i, j };
            buildBoard(gBoard);
            placeMines(gBoard,currCell)
            countMinesAroundNegs(gBoard)
            renderBoard(gBoard)
            elCell = document.querySelector(`.cell-${i}-${j}`)
            cell.isMine = false;
        } else {
           displayCells(i,j)
        }
    }
    if (gIsHint) { 
        checkNegsForHint(i, j,gBoard);
        return;
    }
    gFirstClick = false;
    displayCells(i, j)
    if (cell.isMine) {
        if (gLives) {
            var elLives = document.querySelector(`.lives${gLives - 1}`)
            elLives.innerText = '';
            gLives--;
        } else if (!gLives) { 
            gameOver(false);
        }
    }
    checkGameOver()
}

function cellMarked(elCell, i, j) {
    var elBoard = document.querySelector('.board');
    elBoard.addEventListener('contextmenu', ev => {
        ev.preventDefault();
    });
    var cell = gBoard[i][j]
    gFirstClick = false;
    if (!cell.isShown) {
        if (!cell.isMarked) {
            cell.isMarked = true
            elCell.innerText = FLAG
        }
        else {
            cell.isMarked = false
            elCell.innerText = EMPTY;
        }
    }
    checkGameOver()
}

function displayCell(i, j) {
    var cell = gBoard[i][j];
    cell.isShown = true;
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.classList.remove('hidden')
    elCell.innerText = cell.isMine ? MINE : (cell.minesaroundcount ? cell.minesaroundcount : EMPTY);
}

function displayCells(i, j) {
    var cell = gBoard[i][j];
    if (!cell.isShown && !cell.isMarked) {
        displayCell(i, j)
        if (!cell.isMine) gGame.shownCount++;
        if (cell.minesaroundcount === ' ') expandShown(i,j)
    }
}

function expandShown(row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = col - 1; j <= col + 1; j++) {
            if (i === row && j === col) continue;
            if (j < 0 || j >= gBoard[0].length) continue;
            displayCells(i,j)
        }
    }
}