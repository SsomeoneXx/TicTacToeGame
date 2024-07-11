import { initializeGame } from "./playerOneGame.js";
import { launchGame } from "./playerTwoGame.js";

let gameBoard = document.querySelector(".gameBoard");
let winScreen = document.querySelector(".winScreen");
let restartButton = document.querySelector(".restartButton");
let playerNames = document.querySelector(".playerNames");
let submit = document.querySelector(".submit");
let inputedNames = document.querySelectorAll("input");
let button = document.querySelectorAll("button");
let choosePlayerContainer = document.querySelector(".choosePlayer");

button.forEach((button) => {
  button.addEventListener("click", (e) => {
    choosePlayerContainer.style.display = "none";

    if (e.target.classList.contains("player_one")) {
      gameBoard.style.display = "grid";
      initializeGame(gameBoard, winScreen, restartButton);
      return;
    }

    if (e.target.classList.contains("player_two")) {
      choosePlayerContainer.style.display = "none";
      gameBoard.querySelector("h1").remove();
      playerNames.style.display = "flex";
      launchGame(gameBoard, winScreen, restartButton);
      return;
    }
  });
});

export function submitInput(inputs, submitButton) {
  submitButton.addEventListener("click", (e) => {
    let getValueOne = inputs[0].value.trim();
    let getValueTwo = inputs[1].value.trim();

    const validString = /^[a-zA-Z\s]+$/;

    if (!getValueOne || !validString.test(getValueOne)) {
      alert("Please enter a valid name for player 1");
    }
    if (!getValueTwo || !validString.test(getValueTwo)) {
      alert("Please enter a valid name for player 2");
      return;
    }
    playerNames.style.display = "none";
    gameBoard.style.display = "grid";
  });
}
submitInput(inputedNames, submit);
