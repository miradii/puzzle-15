import { generateArray, repeat } from "../lib/utils";
function boardFactory(size) {
  return {
    size,
    cells: generateArray(size * size - 1, 1),
    emptyCell: 15,
    moves: 0,
  };
}
// these check if a cell can move in a certain direction
const canMoveRight = (index, boardSize) => !((index + 1) % boardSize === 0);
const canMoveLeft = (index, boardSize) => !(index % boardSize === 0);
const canMoveUp = (index, boardSize) =>
  index - boardSize >= 0 && index < boardSize * boardSize;
const canMoveDown = (index, boardSize) =>
  index + boardSize < boardSize * boardSize && index >= 0;

function swapCell(board, movingCell) {
  board.cells[board.emptyCell] = board.cells[movingCell];
  board.cells[movingCell] = 0;
  board.emptyCell = movingCell;
  board.moves++;
}

// these function shift the board
function moveLeft(board) {
  const movingCell = board.emptyCell + 1;
  const willMove = canMoveLeft(movingCell, board.size);
  if (willMove) swapCell(board, movingCell);
  return willMove;
}
function moveRight(board) {
  const movingCell = board.emptyCell - 1;

  const willMove = canMoveRight(movingCell, board.size);
  if (willMove) swapCell(board, movingCell);
  return willMove;
}
function moveDown(board) {
  const movingCell = board.emptyCell - board.size;
  const willMove = canMoveDown(movingCell, board.size);
  if (willMove) swapCell(board, movingCell);
  return willMove;
}
function moveUp(board) {
  const movingCell = board.emptyCell + board.size;
  const willMove = canMoveUp(movingCell, board.size);
  if (willMove) swapCell(board, movingCell);
  return willMove;
}

// calculates the number of times and the direction a cell can move and moves it
function moveCell(index, board) {
  const offset = board.emptyCell - index;
  console.log(offset);
  if (0 < offset && offset < board.size && canMoveRight(index, board.size)) {
    repeat(offset, () => moveRight(board));
  } else if (
    offset < 0 &&
    -offset < board.size &&
    canMoveLeft(index, board.size)
  ) {
    repeat(-offset, () => moveLeft(board));
  } else if (
    offset > 0 &&
    offset % board.size == 0 &&
    canMoveDown(index, board.size)
  ) {
    repeat(offset / board.size, () => moveDown(board));
  } else if (
    offset < 0 &&
    -offset % board.size == 0 &&
    canMoveUp(index, board.size)
  ) {
    repeat(
      -offset / board.size,
      () => moveUp(board) && canMoveUp(index, board.size)
    );
  }
}

// randomized the board based on a difficulty level it starts from the solution and makes some number of mvoes
function randomizeBoard(difficulty, board) {
  const moves = [moveUp, moveDown, moveLeft, moveRight];
  while (difficulty) {
    let randomMoveIndex = Math.floor(Math.random() * 4);

    let randomMove = moves[randomMoveIndex];
    if (randomMove(board)) {
      difficulty--;
    }
  }
  board.moves = 0;
}

// a function that check if the board is solved
function checkBoardState(board) {
  for (let i = 0; i < board.cells.length - 1; i++) {
    if (i + 1 !== board.cells[i]) return false;
  }
  return true;
}

export {
  moveUp,
  moveDown,
  moveRight,
  moveLeft,
  moveCell,
  boardFactory,
  randomizeBoard,
  checkBoardState,
};
