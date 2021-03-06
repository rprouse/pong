var canvas;
var ctx;

var ballX;
var ballY;
var ballSpeedX;
var ballSpeedY;

var paddle1Y;
var paddle2Y;

var score1;
var score2;

var showingWin = false;

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 50;
const PADDLE_X = 10;
const BALL_RADIUS = 5;
const PLAYER2_SPEED = 7;
const WIN_SCORE = 5;

window.onload = function() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');

  init();
  var framesPerSecond = 30;
  setInterval(gameLoop, 1000/framesPerSecond);

  canvas.addEventListener('mousedown', function(evt) {
    if(showingWin) {
      showingWin = false;
      init();
    }
  });

  canvas.addEventListener('mousemove', function(evt) {
    if(showingWin) return;
    var mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y;
  });
}

function init() {
  ballSpeedX = 10;

  score1 = 0;
  score2 = 0;

  ballReset();

  paddle1Y = canvas.height / 2;
  paddle2Y = paddle1Y;
}

function gameLoop() {
  draw();
  if(showingWin) {
    drawWin();
  } else {
    move();
    checkCollisions();
  }
}

function move() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(paddle2Y < ballY - PADDLE_HEIGHT / 4)
    paddle2Y += PLAYER2_SPEED;
  else if(paddle2Y > ballY + PADDLE_HEIGHT / 4)
    paddle2Y -= PLAYER2_SPEED;
}

function checkCollisions() {
  if(ballX >= canvas.width - PADDLE_X - PADDLE_WIDTH - BALL_RADIUS) {
    if (ballY > paddle2Y - PADDLE_HEIGHT / 2 && ballY < paddle2Y + PADDLE_HEIGHT / 2 ) {
      bounceOffPaddle(paddle2Y);
    } else {
      score1++;
      ballReset();
    }
  } else if(ballX <= PADDLE_X + PADDLE_WIDTH + BALL_RADIUS) {
    if (ballY > paddle1Y - PADDLE_HEIGHT / 2 && ballY < paddle1Y + PADDLE_HEIGHT / 2 ) {
      bounceOffPaddle(paddle1Y);
    } else {
      score2++;
      ballReset();
    }
  }

  if(ballY >= canvas.height - BALL_RADIUS)
    ballSpeedY = -ballSpeedY;
  else if(ballY <= BALL_RADIUS)
    ballSpeedY = -ballSpeedY;
}

function bounceOffPaddle(paddleY) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - paddleY;
      ballSpeedY = deltaY * 0.4;
}

function draw() {
  drawBackground();
  drawCenterline();
  drawBall();
  drawLeftPaddle();
  drawRightPaddle();
  drawPlayer1Score();
  drawPlayer2Score();
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

function drawCenterline() {
  ctx.strokeStyle = 'white';
  ctx.beginPath();
  ctx.setLineDash([18, 16]);
  ctx.moveTo(canvas.width/2, 2);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();
}

function drawPlayer1Score() {
  ctx.fillStyle = 'green';
  ctx.font = '48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(score1, canvas.width / 4, 50);
}

function drawPlayer2Score() {
  ctx.fillStyle = 'green';
  ctx.font = '48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(score2, canvas.width - canvas.width / 4, 50);
}

function drawWin() {
  ctx.fillStyle = 'yellow';
  ctx.font = '48px sans-serif';
  ctx.textAlign = 'center';
  var winner = score1 >= WIN_SCORE ? "You Win!!!" : "Computer Wins!!!";
  ctx.fillText(winner, canvas.width / 2, canvas.height / 2);

  ctx.fillStyle = 'white';
  ctx.font = '24px sans-serif';
  ctx.fillText("Click to play again", canvas.width / 2, canvas.height - canvas.height / 4);
}

function ballReset() {
  if(score1 >= WIN_SCORE || score2 >= WIN_SCORE) {
    showingWin = true;
  } else {
    ballSpeedX = -ballSpeedX;
    ballSpeedY = getRandomIntInclusive(-10, 10);
    ballX = canvas.width/2;
    ballY = canvas.height/2;
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
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
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function colorCircle(centerX, centerY, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  ctx.fill();
}