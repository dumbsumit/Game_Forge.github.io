var blocksize = 28;
var rows = 35;
var column = 35;
var board;
var context;

// snake head
var snakex = blocksize * 5;
var snakey = blocksize * 5;

// food
var foodx;
var foody;

// SPEED
var velocityx = 0;
var velocityy = 0;

var gameover = false;
var snakebody = [];
var score = 0; // Track score

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blocksize;
  board.width = column * blocksize;
  context = board.getContext("2d");

  placefood();

  document.addEventListener("keyup", changedirection);
  setInterval(update, 100);
};

function update() {
  if (gameover) {
    // Display game over message and final score
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.font = "40px Arial";
    context.textAlign = "center"; // Center the text horizontally
    context.fillText("GAME OVER", board.width / 2, board.height / 3);

    context.fillStyle = "white";
    context.font = "30px Arial";
    context.fillText("Final Score: " + score, board.width / 2, board.height / 2);

    // Add Restart Button on canvas
    context.fillStyle = "green";
    context.font = "25px Arial";
    context.fillText("Press R to Restart", board.width / 2, board.height / 1.5);

    return;
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodx, foody, blocksize, blocksize);

  if (snakex == foodx && snakey == foody) {
    snakebody.push([foodx, foody]);
    placefood();
    score++; // Increase score when food is eaten
    updateScoreDisplay(); // Update the score display above the canvas
  }

  for (let i = snakebody.length - 1; i > 0; i--) {
    snakebody[i] = snakebody[i - 1];
  }

  if (snakebody.length) {
    snakebody[0] = [snakex, snakey];
  }

  context.fillStyle = "lime";
  snakex += velocityx * blocksize;
  snakey += velocityy * blocksize;
  context.fillRect(snakex, snakey, blocksize, blocksize);

  for (let i = 0; i < snakebody.length; i++) {
    context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize);
  }

  // Game over conditions
  if (snakex < 0 || snakex >= column * blocksize || snakey < 0 || snakey >= rows * blocksize) {
    gameover = true;
  }

  for (let i = 0; i < snakebody.length; i++) {
    if (snakex == snakebody[i][0] && snakey == snakebody[i][1]) {
      gameover = true;
    }
  }
}

// Function to update the score display above the canvas
function updateScoreDisplay() {
  document.getElementById("score").textContent = score;
}

function changedirection(e) {
  if (gameover) {
    if (e.code === "KeyR") {
      // Restart the game
      score = 0;
      snakex = blocksize * 5;
      snakey = blocksize * 5;
      velocityx = 0;
      velocityy = 0;
      snakebody = [];
      gameover = false;
      placefood();
      updateScoreDisplay(); // Reset the score display
    }
  } else {
    if (e.code == "ArrowUp" && velocityy != 1) {
      velocityx = 0;
      velocityy = -1;
    } else if (e.code == "ArrowDown" && velocityy != -1) {
      velocityx = 0;
      velocityy = 1;
    } else if (e.code == "ArrowLeft" && velocityx != 1) {
      velocityx = -1;
      velocityy = 0;
    } else if (e.code == "ArrowRight" && velocityx != -1) {
      velocityx = 1;
      velocityy = 0;
    }
  }
}

function placefood() {
  foodx = Math.floor(Math.random() * column) * blocksize;
  foody = Math.floor(Math.random() * rows) * blocksize;
}
