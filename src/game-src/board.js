export default function boardFactory(size) {
  return {
    size,
    cells: generateArray(size * size - 1, 1),
    emptyCell: 15,
  };
}
const generateArray = (num, add) => {
  let puzzle = [...Array(num)].map((_, i) => i + add);
  puzzle.push(0);
  return puzzle;
};

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
  console.log("down");
  const movingCell = board.emptyCell - board.size;
  const willMove = canMoveDown(movingCell, board.size);
  if (willMove) swapCell(board, movingCell);
  return willMove;
}
function moveUp(board) {
  console.log("up");
  const movingCell = board.emptyCell + board.size;
  const willMove = canMoveUp(movingCell, board.size);
  if (willMove) swapCell(board, movingCell);
  return willMove;
}

const moveSelector = {
  1: moveRight,
  "-1": moveLeft,
  4: moveDown,
  "-4": moveUp,
};

function repeat(num, cb) {
  for (let i = num; i > 0; i--) {
    cb();
  }
}

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

function randomizeBoard(difficulty, board) {
  const moves = [moveUp, moveDown, moveLeft, moveRight];
  while (difficulty) {
    let randomMoveIndex = Math.floor(Math.random() * 4);

    let randomMove = moves[randomMoveIndex];
    if (randomMove(board)) {
      difficulty--;
    }
  }
}

export {
  moveUp,
  moveDown,
  moveRight,
  moveLeft,
  moveCell,
  boardFactory,
  randomizeBoard,
};
