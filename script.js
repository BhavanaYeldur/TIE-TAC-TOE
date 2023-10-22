// Initialize the game
let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.game--status');
let gameActive = true;

statusDisplay.textContent = `It's ${currentPlayer}'s turn`;

// Winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Function to handle cell click
function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = Array.from(cells).indexOf(clickedCell);

  if (gameActive && cells[cellIndex].textContent === '') {
    cells[cellIndex].textContent = currentPlayer;
    checkResult();
  }
}

// Function to check if the game has a winner or is a draw
function checkResult() {
  let roundWon = false;

  for (const condition of winningConditions) {
    const [a, b, c] = condition;

    if (cells[a].textContent !== '' &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  if (![...cells].some(cell => cell.textContent === '')) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

// Add click event listeners to cells
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Reset the game
document.querySelector('.game--restart').addEventListener('click', () => {
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
});
