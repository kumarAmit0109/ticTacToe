'use strict';

import './styles.css';

const preloader = document.querySelector('#preloader');
const gameStatus = document.querySelector('#game-status');
const boxes = document.querySelectorAll('.boxes');
const newGameButton = document.querySelector('#new-game-button');
const restartGameButton = document.querySelector('#restart-game-button');

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer;
let gameGrid;

const initGame = () => {
    currentPlayer = 'X';
    gameGrid = ['', '', '', '', '', '', '', '', ''];
    boxes.forEach((box) => {
        box.innerText = '';
        box.style.cssText = 'background-color: transparent; cursor: pointer;'
    });
    newGameButton.style.display = 'none';
    restartGameButton.style.display = 'block';
    gameStatus.innerText = `Current Player is ${currentPlayer}`;
};

window.addEventListener('load', () => {
    initGame();
    setTimeout(() => {
        preloader.classList.add('opacity-0');
        preloader.classList.add('invisible');
        preloader.classList.add('pointer-events-none');
        document.body.classList.remove('overflow-hidden');
    }, 2000);
});
newGameButton.addEventListener('click', initGame);
restartGameButton.addEventListener('click', initGame);

const changePlayer = () => {
    currentPlayer = (currentPlayer === 'X' ? 'O' : 'X');
    gameStatus.innerText = `Current Player is ${currentPlayer}`;
};

const checkGameOver = () => {
    let winner = '';
    let winnerPosition = [];
    winningPositions.forEach((position) => {
        if(gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]] && gameGrid[position[0]] !== ''){
            winner = (gameGrid[position[0]] === 'X' ? 'X' : 'O');
            for(let i = 0; i < position.length; i++){
                winnerPosition.push(position[i]);
            }
        }
    });

    if(winner !== ''){
        gameStatus.innerText = `Winner is ${winner} 🥇`;
        newGameButton.style.display = 'block';
        restartGameButton.style.display = 'none';

        boxes.forEach((box) => {
            box.style.pointerEvents = 'none';
        });

        for(let i = 0; i < winnerPosition.length; i++){
            boxes[winnerPosition[i]].style.backgroundColor = '#389a27';
        }
        return;
    }

    let filledPositions = 0;
    gameGrid.forEach((position) => {
        if(position !== ''){
            filledPositions++;
        }
    });

    if(filledPositions === 9){
        gameStatus.innerText = `Game Tied 😥`;
        newGameButton.style.display = 'block';
        restartGameButton.style.display = 'none';
    }
}

const handleTurn = (index) => {
    if(gameGrid[index] === ''){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = 'none';
        changePlayer();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleTurn(index);
    });
});