'use strict';



function cellClicked(elCell, i, j) {
    
    displayCell(i,j) 
    if (gFirstClick) {
        // firstClick()
        if (gBoard[i][j].isMine) {
            var currCell = { i, j };
            gBoard = buildBoard(gBoard);
            placeMines(gBoard, currCell)
            countMinesAroundNegs(gBoard)
            renderBoard(gBoard)
            elCell = document.querySelector(`.cell${i}-${j}`)
        }
    }

    gFirstClick = false;
   
    if (!gBoard[i][j].isShown) {
       
        if (!gBoard[i][j].isMarked) {
            gBoard[i][j].isMarked = true
        }
        else {
            gBoard[i][j].isMarked = false
        }
    }
    
    // checkGameOver()
}

function cellMarked(elCell,i,j) {
    var elBoard = document.querySelector('.board');

    elBoard.addEventListener('contextmenu', function (ev) { 
        ev.preventDefault(); 
    }, false);

    // if (gFirstClick) startTimer();

    gFirstClick = false;
    if (!gBoard[i][j].isShown) {
        if (!gBoard[i][j].isMarked) {
            gBoard[i][j].isMarked = true
            elCell.innerText = FLAG
        }
        else {
            gBoard[i][j].isMarked = false 
            elCell.innerText = EMPTY;
        }
    }
    // checkGameOver()
}

function firstClick() {

    // gTimeInterval = setInterval(gameTimer, 10);
    gBoard = buildBoard(gBoard);
    countMinesAroundNegs(gBoard)
}

function displayCell(i,j) {
    var cell = gBoard[i][j];
    cell.isShown = true;
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.classList.remove('hidden')
    elCell.innerText = cell.isMine ? MINE : (cell.minesaroundcount ? cell.minesaroundcount : EMPTY);
}
