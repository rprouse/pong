var canvas;
var canvasContext;

var ballX;
var ballY;
var ballSpeedX;
var ballSpeedY;

var leftPaddleY;
var rightPaddleY;

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 50;
const PADDLE_X = 10;
const BALL_RADIUS = 5;

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
  ballSpeedY = 7;

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

  if(ballX >= canvas.width - PADDLE_X - PADDLE_WIDTH - BALL_RADIUS)
    ballSpeedX = -ballSpeedX;
  else if(ballX <= PADDLE_X + PADDLE_WIDTH + BALL_RADIUS)
    ballSpeedX = -ballSpeedX;

  if(ballY >= canvas.height - BALL_RADIUS)
    ballSpeedY = -ballSpeedY;
  else if(ballY <= BALL_RADIUS)
    ballSpeedY = -ballSpeedY;
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
  colorCircle(ballX, ballY, BALL_RADIUS, 'white');
}

function drawLeftPaddle() {
  colorRect(PADDLE_X, leftPaddleY - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
}

function drawRightPaddle() {
  colorRect(canvas.width - PADDLE_X - PADDLE_WIDTH, rightPaddleY - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
}

function colorRect(x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

function colorCircle(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}