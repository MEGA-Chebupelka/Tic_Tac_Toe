//Game 
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const updateCell = (index, value) => {
        if (index >= 0 && index < board.length && board[index] === ""){
            board[index] = value;
            return true;
        }
        return false;
    };

    const getBoard = () => board;
    
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return {getBoard, updateCell, resetBoard};
})();

const Player = (name, symbol) => {
    return {name, symbol};
};

const GameController = (() => {
    let currentPlayer;
    const players = [];
    let gameOver = false;

    // ADD players
    const startGame = (player1Name, player2Name) => {
        players.length = 0;
        Gameboard.resetBoard();
        renderBoard();
        gameOver = false;
        players.push(Player(player1Name, "X"));
        players.push(Player(player2Name, "O"));
        currentPlayer = players[0];
        infoPanel.textContent = `The game has started! The first move for ${currentPlayer.name}`;
        console.log(Gameboard.getBoard());
    };

    // Players Move
    const playTurn = (index) => {
        if (gameOver) {
            console.log("Игра уже завершена!");
            infoPanel.textContent = `The game is already over!`;
            return false; // Возврат false, так как игра завершена
        }
    
        if (Gameboard.updateCell(index, currentPlayer.symbol)) {
            console.log(`${currentPlayer.name} сделал ход в клетку ${index}`);
            infoPanel.textContent = `${currentPlayer.name} made a move to the cell ${index}`;
            
            if (checkWin()) {
                console.log(`Winner: ${currentPlayer.name}!`);
                infoPanel.textContent = `Winner: ${currentPlayer.name}!`;
                gameOver = true;
                return true; // Успешный ход
            }
            
            if (checkTie()) {
                console.log("Tie!");
                infoPanel.textContent = `Tie!`;
                gameOver = true;
                return true; // Успешный ход
            }
    
            switchPlayer();
            return true; // Успешный ход
        } else {
            console.log("Эта клетка уже занята! Выберите другую.");
            infoPanel.textContent = `This cell is already occupied! Choose another one.`;
            return false; // Ход неуспешен
        }
    };

    // switchPlayer
    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        console.log(`The next move is for  ${currentPlayer.name}`);
        infoPanel.textContent = `The next move is for  ${currentPlayer.name}`;
    };

    // Win check
    const checkWin = () => {
        const board = Gameboard.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // row
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // column
            [0, 4, 8], [2, 4, 6]             // x
        ];

        return winPatterns.some(pattern => 
            pattern.every(index => board[index] === currentPlayer.symbol)
        );
    };

    // Tie check
    const checkTie = () => {
        const board = Gameboard.getBoard();
        return board.every(cell => cell !== ""); // All cells are not empty
    };

    return { startGame, playTurn };
})();

//API ---------------------------------------------------------------------------------------


//Modal Window and Form and infopanel

const newGameBtn = document.getElementById('startNewGame');
newGameBtn.addEventListener('click', openModal)

const closeModalWindowBtn = document.getElementById('close');
closeModalWindowBtn.addEventListener('click',closeModal)

const modalWindow = document.getElementById('modal');

const infoPanel = document.getElementById('info-panel');

document.getElementById('addNewPlayers').addEventListener('submit', 
    function(event){
        event.preventDefault();
        const firstPlayer = document.getElementById('playerOne').value;
        const secondPlayer = document.getElementById('playerTwo').value;
        GameController.startGame(firstPlayer,secondPlayer);
        closeModal();
        this.reset();
    }
)

window.addEventListener('click', function(event) {
    if (event.target === modalWindow) {
        closeModal();
    }})

function openModal(){
    modalWindow.style.display = 'block';
}

function closeModal(){
    modalWindow.style.display = 'none';
}

// Board

const cells = document.querySelectorAll('.cell'); 

function renderCell(cell, value) {
    cell.innerHTML = ""; 
    if (value === "X" || value === "O") {
        const img = document.createElement("img");
        img.src = value === "X" ? "img/cross.svg" : "img/circle.svg"; 
        img.alt = value; 
        cell.appendChild(img);
    }
}

function renderBoard() {
    const board = Gameboard.getBoard(); 
    cells.forEach((cell, index) => {
        renderCell(cell, board[index]);
    });
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (GameController.playTurn(index)) {
            renderBoard(); 
        }
    });
});

renderBoard();