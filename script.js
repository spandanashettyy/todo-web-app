const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let gameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.dataset.index;
    if (gameBoard[index] === '' && gameActive) {
      gameBoard[index] = currentPlayer;
      cell.textContent = currentPlayer;
      if (checkWinner()) {
        statusText.textContent = Player ${currentPlayer} wins!;
        gameActive = false;
      } else if (!gameBoard.includes('')) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = Player ${currentPlayer}'s turn;
      }
    }
  });
});

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] === currentPlayer &&
           gameBoard[b] === currentPlayer &&
           gameBoard[c] === currentPlayer;
  });
}

function resetGame() {
  gameBoard = Array(9).fill('');
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = Player ${currentPlayer}'s turn;
  cells.forEach(cell => (cell.textContent = ''));
}