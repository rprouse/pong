var canvas;
var canvasContext;

var ballX;
var ballY;
var ballSpeed;

var leftPaddleY;
var rightPaddleY;

window.onload = function() {
  canvas = document.getElementById('game');
  canvasContext = canvas.getContext('2d');

  init();
  var framesPerSecond = 30;
  setInterval(gameLoop, 1000/framesPerSecond);
}

function init() {
  ballX = 30;
  ballY = canvas.height / 2;
  ballSpeed = 10;

  leftPaddleY = canvas.height / 2;
  rightPaddleY = leftPaddleY;
}

function gameLoop() {
  draw();
  move();
}

function move() {
  ballX += ballSpeed;
  if(ballX >= canvas.width - 20)
    ballSpeed = -ballSpeed;
  else if(ballX <= 20)
    ballSpeed = -ballSpeed;
}

function draw() {
  drawBackground();
  drawBall();
  drawLeftPaddle();
  drawRightPaddle();
}

function drawBackground() {
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBall() {
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(ballX - 5, ballY - 5, 10, 10)
}

function drawLeftPaddle() {
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(10, leftPaddleY - 25, 10, 50)
}

function drawRightPaddle() {
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(canvas.width - 20, rightPaddleY - 25, 10, 50)
}