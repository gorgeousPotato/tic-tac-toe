/*----- constants -----*/

const COLORS = {
  1: "#EB455F",
  "-1": "#2B3467",
};

const SIGN = {
  1: "X",
  "-1": "O",
  0: "",
};

/*----- state variables -----*/

let board, turn, winner;

/*----- cached elements  -----*/

const messageEl = document.querySelector("h1");
const boardCells = [...document.querySelectorAll("#board > div")];
const playAgainBtn = document.querySelector("button");

/*----- event listeners -----*/

document.getElementById("board").addEventListener("click", handleClick);
playAgainBtn.addEventListener("click", init);

/*----- functions -----*/
init();

function init() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  turn = 1;
  winner = null;
  render();
}

function render() {
  renderBoard();
  renderMessage();
}

function renderBoard() {
  board.forEach((cell, cellIdx) => {
    const cellId = `c${cellIdx}`;
    const cellEl = document.querySelector(`#${cellId}`);
    cellEl.innerHTML = SIGN[cell];
    cellEl.style.color = COLORS[cell];
  });
}

function renderMessage() {
  if (winner === "T") {
    messageEl.innerHTML = "It's a tie!";
  } else if (winner) {
    messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${SIGN[winner]}</span> win! `;
  } else {
    messageEl.innerHTML = `It's your turn <span style="color: ${COLORS[turn]}">${SIGN[turn]}</span> `;
  }
  playAgainBtn.style.visibility = winner ? "visible" : "hidden";
}

function handleClick(e) {
  const cellIdx = boardCells.indexOf(e.target);
  console.log(cellIdx);
  if (cellIdx === -1) return;
  if (board[cellIdx] !== 0) return;
  e.target.innerHTML = `${SIGN[turn]}`;
  board[cellIdx] = turn;
  winner = getWinner();
  turn *= -1;
  render();
}

function getWinner() {
  const calcWinner = checkVerticalWin();
  const boardFull = !board.includes(0);
  return !calcWinner && boardFull ? "T" : calcWinner;
}

function checkVerticalWin() {
  let win = null;
  //vertical
  if (board[0] === board[3] && board[0] === board[6] && board[0] !== 0)
    win = board[0];
  if (board[1] === board[4] && board[1] === board[7] && board[1] !== 0)
    win = board[1];
  if (board[2] === board[5] && board[2] === board[8] && board[2] !== 0)
    win = board[2];
  //horizontal
  if (board[0] === board[1] && board[0] === board[2] && board[0] !== 0)
    win = board[0];
  if (board[3] === board[4] && board[3] === board[5] && board[3] !== 0)
    win = board[3];
  if (board[6] === board[7] && board[6] === board[8] && board[6] !== 0)
    win = board[6];
  //diagonal
  if (board[0] === board[4] && board[0] === board[8] && board[0] !== 0)
    win = board[0];
  if (board[2] === board[4] && board[2] === board[6] && board[2] !== 0)
    win = board[2];
  console.log(`winner is ${win}`);
  return win;
}
