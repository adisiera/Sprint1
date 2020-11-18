'use strict';



function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j]
    displayCell(i, j)
    if (gFirstClick) {
        // startTimer();
        // gTimeInterval = setInterval(gameTimer, 10);
        // gBoard = buildBoard(gBoard);
        // countMinesAroundNegs(gBoard)
        if (cell.isMine) {
            var currCell = { i, j };
            gBoard = buildBoard(gBoard);
            placeMines(gBoard, currCell)
            countMinesAroundNegs(gBoard)
            renderBoard(gBoard)
            elCell = document.querySelector(`.cell${i}-${j}`)
        }
    }

    gFirstClick = false;

    if (!cell.isShown) {

        if (!cell.isMarked) {
            cell.isMarked = true
        }
    }

    // checkGameOver()
}

function cellMarked(elCell, i, j) {
    var elBoard = document.querySelector('.board');

    elBoard.addEventListener('contextmenu', function (ev) {
        ev.preventDefault();
    }, false);

    var cell = gBoard[i][j]

    // if (gFirstClick) {
        

    // }
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
    // checkGameOver()
}

function displayCell(i, j) {
    var cell = gBoard[i][j];
    cell.isShown = true;
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.classList.remove('hidden')
    elCell.innerText = cell.isMine ? MINE : (cell.minesaroundcount ? cell.minesaroundcount : EMPTY);
}


function expandShown(row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === row && j === col) continue
            var elCell = document.querySelector(`.cell${i}-${j}`)
            gBoard[i][j].isShown = true;
            elCell.classList.remove('hidden')
        }
    }
}