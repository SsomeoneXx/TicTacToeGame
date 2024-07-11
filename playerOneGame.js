export const player = "x";
export const computer = "o";
export let SCORE = 0;

let score = document.querySelector("span");
score.textContent = SCORE;
let $firstOrSecond = [true, false];
let firstPlayer =
  $firstOrSecond[Math.floor(Math.random() * $firstOrSecond.length)];

let CHECK_WINNER = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function initializeGame(gameBoard, winScreen, restartButton) {
  let cells = gameBoard.querySelectorAll("[data-cell]");
  cells.forEach((element, _, arr) => {
    if (!firstPlayer) {
      chooseComputer(arr, cells, winScreen);
      firstPlayer = true;
    }
    element.addEventListener("click", (e) => {
      let clicked = e.target;

      if (
        firstPlayer &&
        !clicked.classList.contains(player) &&
        !clicked.classList.contains(computer)
      ) {
        clicked.classList.add(player);
        void clicked.offsetWidth;
        clicked.classList.add("lineAnimation");

        if (checkWinner(player, cells)) {
          showModal(player, winScreen);
          SCORE++;
          score.textContent = SCORE;
          return;
        }
        if (checkDraw(cells)) {
          winScreen.classList.add("show");
          score.textContent = SCORE;
          winScreen.querySelector("h1").textContent = "Match is Draw";
        }
        firstPlayer = false;
        setTimeout(() => {
          chooseComputer(cells, cells, winScreen);
        }, 100);
      }
    });
  });
  restartButton.addEventListener("click", (e) => {
    firstPlayer =
      $firstOrSecond[Math.floor(Math.random() * $firstOrSecond.length)];
    cells.forEach((cell) => {
      winScreen.classList.remove("show");
      cell.classList.remove("roundAnimation");
      cell.classList.remove("lineAnimation");
      cell.classList.remove(player);
      cell.classList.remove(computer);
    });
    initializeGame(gameBoard, winScreen, restartButton);
  });
}

function chooseComputer(array, cells, winScreen) {
  let emptyCells = Array.from(array).filter(
    (cell) =>
      !cell.classList.contains(player) && !cell.classList.contains(computer)
  );
  if (emptyCells.length === 0) return;
  let randomChoice = Math.floor(Math.random() * emptyCells.length);
  let chosenElement = emptyCells[randomChoice];

  chosenElement.classList.add(computer);
  void chosenElement.offsetWidth;
  chosenElement.classList.add("roundAnimation");

  if (checkWinner(computer, cells)) {
    showModal(computer, winScreen);
    SCORE--;
    score.textContent = SCORE;
    return;
  }
  if (checkDraw(cells)) {
    winScreen.classList.add("show");
    winScreen.querySelector("h1").textContent = "Match is Draw";
    score.textContent = SCORE;
  }
  firstPlayer = true;
}

function checkDraw(cells) {
  return Array.from(cells).every(
    (cell) =>
      cell.classList.contains(player) || cell.classList.contains(computer)
  );
}

function checkWinner(currentPlayer, cells) {
  return CHECK_WINNER.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
}

function showModal(winner, winScreen) {
  if (winner == "x") {
    winScreen.classList.add("show");
    winScreen.querySelector("h1").textContent = "You Won! Congratulations 🎊 ";
    return;
  }
  if (winner == "o") {
    winScreen.classList.add("show");
    winScreen.querySelector("h1").textContent = "You Lost! Try Again.";
    return;
  }
}
