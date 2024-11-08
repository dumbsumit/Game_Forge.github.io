//board
let board;
let boardwidth = 360;
let boardheight = 640;
let context;

//bird
let birdwidth = 34;
let birdheight = 24;
let birdx = boardwidth / 8;
let birdy = boardheight / 2;
let birdimg;

//physics
let velocityx = -2; // pipes moving left speed
let velocityy = 0; // bird jump speed
let gravity = 0.4;

let bird = {
  x: birdx,
  y: birdy,
  width: birdwidth,
  height: birdheight,
};

//pipes
let pipearray = [];
let pipewidth = 64;
let pipeheight = 512;
let pipex = boardwidth;
let pipey = 0;

let toppipeimg;
let bottompipeimg;

let gameover = false;
let score = 0;
let gameStarted = false;  // New flag to control the start of the game

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardheight;
  board.width = boardwidth;
  context = board.getContext("2d"); // used for drawing on the board

  // Load the images
  birdimg = new Image();
  birdimg.src = "./flappybird.png";
  birdimg.onload = function () {
    context.drawImage(birdimg, bird.x, bird.y, bird.height, bird.width);
  };

  toppipeimg = new Image();
  toppipeimg.src = "./toppipe.png";
  
  bottompipeimg = new Image();
  bottompipeimg.src = "./bottompipe.png";

  requestAnimationFrame(update);
  setInterval(placepipes, 1500); // every 1.5 sec
  document.addEventListener("keydown", movebird);
};

function update() {
  requestAnimationFrame(update);
  
  if (gameover) return;

  context.clearRect(0, 0, board.width, board.height);
  
  if (gameStarted) {
    // Apply gravity and update bird's position
    velocityy += gravity;
    bird.y = Math.max(bird.y + velocityy, 0); // Apply gravity or make sure bird does not cross the canvas
  }
  
  context.drawImage(birdimg, bird.x, bird.y, bird.height, bird.width);
  
  if (bird.y > board.height) {
    gameover = true;
  }

  // Update pipes
  for (let i = 0; i < pipearray.length; i++) {
    let pipe = pipearray[i];
    pipe.x += velocityx;
    
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    
    // Update score
    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
    }

    // Check for collision
    if (detectcollision(bird, pipe)) {
      gameover = true;
    }
  }
  //clear plays  
  while(pipearray.length > 0 &&pipearray[0].x < -pipewidth ){
    pipearray.shift(); //removes first element from the array
  }

  // Display score
  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 5, 45);

  if(gameover){
    context.fillStyle = "red";
    context.fillText("GAME OVER", 5, 90);
  }

  if(gameover){
    context.font = "30px sans-serif";
    context.fillStyle = "black";
    context.fillText("SCORE-:",5,130);
    context.fillText(score,135, 130);
  }
}

function placepipes() {
  if (gameover) return;
  
  let randompipey = pipey - pipeheight / 4 - Math.random() * (pipeheight / 2);
  let openingspace = boardheight / 4;

  let toppipe = {
    img: toppipeimg,
    x: pipex,
    y: randompipey,
    width: pipewidth,
    height: pipeheight,
    passed: false,
  };

  pipearray.push(toppipe);

  let bottompipe = {
    img: bottompipeimg,
    x: pipex,
    y: randompipey + pipeheight + openingspace,
    width: pipewidth,
    height: pipeheight,
    passed: false,
  };

  pipearray.push(bottompipe);
}

function movebird(e) {
  // Start the game only after the first key press
  if (!gameStarted) {
    gameStarted = true;
  }

  if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
    velocityy = -5;  // Make the bird jump when a key is pressed
  }

  if(gameover){
    bird.y = birdy;
    pipearray=[];
    score=0;
    gameover=false;
    gameStarted = false;
  }
}

function detectcollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
