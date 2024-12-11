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
    const players = [
        {name:"BOb", symbol:"X"},
        {name:"Vlad", symbol:"O"}
    ];
    let gameOver = false;

    // ADD players
    const startGame = (player1Name, player2Name) => {
        players.push(Player(player1Name, "X"));
        players.push(Player(player2Name, "O"));
        currentPlayer = players[0];
        gameOver = false;
        Gameboard.resetBoard();
        console.log(`Игра началась! Первый ход за ${currentPlayer.name}`);
        console.log(Gameboard.getBoard());
    };

    // Players Move
    const playTurn = (index) => {
        if (gameOver) {
            console.log("Игра уже завершена!");
            return;
        }

        if (Gameboard.updateCell(index, currentPlayer.symbol)) {
            console.log(`${currentPlayer.name} сделал ход в клетку ${index}`);
            if (checkWin()) {
                console.log(`Победитель: ${currentPlayer.name}!`);
                gameOver = true;
                return;
            }
            if (checkTie()) {
                console.log("Ничья!");
                gameOver = true;
                return;
            }
            switchPlayer();
        } else {
            console.log("Эта клетка уже занята! Выберите другую.");
        }
        console.log(Gameboard.getBoard());
    };

    // switchPlayer
    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        console.log(`Ход за ${currentPlayer.name}`);
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

//API 