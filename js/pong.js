var canvas;
var canvasContext;

var ballX;
var ballY;
var ballSpeedX;
var ballSpeedY;

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
  ballSpeedX = 10;
  ballSpeedY = 0;

  leftPaddleY = canvas.height / 2;
  rightPaddleY = leftPaddleY;
}

function gameLoop() {
  draw();
  move();
}

function move() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX >= canvas.width - 20)
    ballSpeedX = -ballSpeedX;
  else if(ballX <= 20)
    ballSpeedX = -ballSpeedX;
}

function draw() {
  drawBackground();
  drawBall();
  drawLeftPaddle();
  drawRightPaddle();
}

function drawBackground() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function drawBall() {
  colorRect(ballX - 5, ballY - 5, 10, 10, 'white');
}

function drawLeftPaddle() {
  colorRect(10, leftPaddleY - 25, 10, 50, 'white');
}

function drawRightPaddle() {
  colorRect(canvas.width - 20, rightPaddleY - 25, 10, 50, 'white');
}

function colorRect(x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}