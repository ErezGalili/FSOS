const board = document.getElementById("board");
const statusDiv = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;

const cells = Array(9).fill(null);

function createBoard() {
    board.innerHTML = "";
    cells.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleCellClick(index));
        board.appendChild(cell);
    });
}

function handleCellClick(index) {
    if (!gameActive || cells[index] !== null) return;

    cells[index] = currentPlayer;
    const cell = board.children[index];
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin()) {
        statusDiv.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (cells.every(cell => cell !== null)) {
        statusDiv.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6],            
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    cells.fill(null);
    statusDiv.textContent = "Player X's turn";
    createBoard();
}

createBoard();
