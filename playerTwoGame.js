export const player_one = "x";
export const player_two = "o";

let firstPlayer = true;
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

export function launchGame(gameBoard, winScreen, restartButton) {
  let cells = gameBoard.querySelectorAll("[data-cell]");
  cells.forEach((element, _, arr) => {
    element.addEventListener("click", (e) => {
      let clicked = e.target;

      if (
        firstPlayer &&
        !clicked.classList.contains(player_one) &&
        !clicked.classList.contains(player_two)
      ) {
        clicked.classList.add(player_one);
        void clicked.offsetWidth;
        clicked.classList.add("lineAnimation");

        if (checkWinner(player_one, cells)) {
          showModal(player_one, winScreen);
          return;
        }
        if (checkDraw(cells)) {
          winScreen.classList.add("show");
          winScreen.querySelector("h1").textContent = "Match is Draw";
        }
      }

      firstPlayer = false;
      if (
        !firstPlayer &&
        !clicked.classList.contains(player_one) &&
        !clicked.classList.contains(player_two)
      ) {
        clicked.classList.add(player_two);
        
        void clicked.offsetWidth;
        clicked.classList.add("roundAnimation");

        if (checkWinner(player_two, cells)) {
          showModal(player_two, winScreen);
          return;
        }
        if (checkDraw(cells)) {
          winScreen.classList.add("show");
          winScreen.querySelector("h1").textContent = "Match is Draw";
        }
        firstPlayer = true;
      }
    });
  });
  restartButton.addEventListener("click", (e) => {
    firstPlayer = true;
    cells.forEach((cell) => {
      firstPlayer = true;
      winScreen.classList.remove("show");
      cell.classList.remove("roundAnimation");
      cell.classList.remove("lineAnimation");
      cell.classList.remove(player_one);
      cell.classList.remove(player_two);
    });
  });
}

function checkDraw(cells) {
  return Array.from(cells).every(
    (cell) =>
      cell.classList.contains(player_one) || cell.classList.contains(player_two)
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
    winScreen.querySelector("h1").textContent = "Player One Wins 🎊 ";
    return;
  }
  if (winner == "o") {
    winScreen.classList.add("show");
    winScreen.querySelector("h1").textContent = "Player Two Wins 🎊";
    return;
  }
}
