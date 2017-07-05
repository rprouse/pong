var canvas;
var canvasContext;

var ballX;
var ballY;
var ballSpeedX;
var ballSpeedY;

var paddle1Y;
var paddle2Y;

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 50;
const PADDLE_X = 10;
const BALL_RADIUS = 5;
const PLAYER2_SPEED = 7;

window.onload = function() {
  canvas = document.getElementById('game');
  canvasContext = canvas.getContext('2d');

  init();
  var framesPerSecond = 30;
  setInterval(gameLoop, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y;
  });
}

function init() {
  ballSpeedX = 10;
  ballSpeedY = 7;

  ballReset();

  paddle1Y = canvas.height / 2;
  paddle2Y = paddle1Y;
}

function gameLoop() {
  draw();
  move();
  checkCollisions();
}

function move() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(paddle2Y < ballY)
    paddle2Y += PLAYER2_SPEED;
  else if(paddle2Y > ballY)
    paddle2Y -= PLAYER2_SPEED;
}

function checkCollisions() {
  if(ballX >= canvas.width - PADDLE_X - PADDLE_WIDTH - BALL_RADIUS) {
    if (ballY > paddle2Y - PADDLE_HEIGHT / 2 && ballY < paddle2Y + PADDLE_HEIGHT / 2 ) {
      ballSpeedX = -ballSpeedX;
    } else {
      // TODO: Score player 1
      ballReset();
    }
  } else if(ballX <= PADDLE_X + PADDLE_WIDTH + BALL_RADIUS) {
    if (ballY > paddle1Y - PADDLE_HEIGHT / 2 && ballY < paddle1Y + PADDLE_HEIGHT / 2 ) {
      ballSpeedX = -ballSpeedX;
    } else {
      // TODO: Score player 2
      ballReset();
    }
  }

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
  colorRect(PADDLE_X, paddle1Y - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
}

function drawRightPaddle() {
  colorRect(canvas.width - PADDLE_X - PADDLE_WIDTH, paddle2Y - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
}

function ballReset() {
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = -ballSpeedX;
}

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
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