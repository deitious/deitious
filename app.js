k    snakeCanvas.height = 400;
    document.body.appendChild(snakeCanvas);
    snakeCtx = snakeCanvas.getContext("2d");
  }

  // Reset snake game
  snake = [{x: 9 * 20, y: 10 * 20}];
  snakeDir = null;
  box = 20;
  food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
  };

  document.addEventListener("keydown", direction);

  if (gameLoop) clearInterval(gameLoop);
  gameLoop = setInterval(drawSnakeGame, 100);
}

function direction(event) {
  if (event.key === "ArrowLeft" && snakeDir !== "RIGHT") snakeDir = "LEFT";
  else if (event.key === "ArrowUp" && snakeDir !== "DOWN") snakeDir = "UP";
  else if (event.key === "ArrowRight" && snakeDir !== "LEFT") snakeDir = "RIGHT";
  else if (event.key === "ArrowDown" && snakeDir !== "UP") snakeDir = "DOWN";
}

function drawSnakeGame() {
  snakeCtx.fillStyle = "black";
  snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

  for (let i = 0; i < snake.length; i++) {
    snakeCtx.fillStyle = (i === 0) ? "lime" : "white";
    snakeCtx.fillRect(snake[i].x, snake[i].y, box, box);
    snakeCtx.strokeStyle = "black";
    snakeCtx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  snakeCtx.fillStyle = "red";
  snakeCtx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeDir === "LEFT") snakeX -= box;
  if (snakeDir === "UP") snakeY -= box;
  if (snakeDir === "RIGHT") snakeX += box;
  if (snakeDir === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    snake.pop();
  }

  const newHead = {x: snakeX, y: snakeY};

  // Game over rules
  if (
    snakeX < 0 || snakeY < 0 ||
    snakeX >= snakeCanvas.width || snakeY >= snakeCanvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(gameLoop);
    alert("Game Over! Type 'snake' again to restart.");
    return;
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
