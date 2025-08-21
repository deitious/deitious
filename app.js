// Snake game code, triggered only when user types "snake"
function startSnakeGame() {
  const canvas = document.createElement("canvas");
  canvas.id = "snakeCanvas";
  canvas.width = 400;
  canvas.height = 400;
  canvas.style.border = "2px solid white";
  canvas.style.display = "block";
  canvas.style.margin = "20px auto";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  let box = 20;
  let snake = [];
  snake[0] = { x: 9 * box, y: 10 * box };
  let direction = null;
  let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
  };
  let score = 0;

  // WASD controls
  document.addEventListener("keydown", (e) => {
    if (e.key === "w" && direction !== "DOWN") direction = "UP";
    if (e.key === "s" && direction !== "UP") direction = "DOWN";
    if (e.key === "a" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "d" && direction !== "LEFT") direction = "RIGHT";
  });

  function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i === 0 ? "lime" : "green";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "UP") snakeY -= box;
    if (direction === "DOWN") snakeY += box;
    if (direction === "LEFT") snakeX -= box;
    if (direction === "RIGHT") snakeX += box;

    if (snakeX === food.x && snakeY === food.y) {
      score++;
      food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
      };
    } else {
      snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Game over
    if (
      snakeX < 0 ||
      snakeY < 0 ||
      snakeX >= canvas.width ||
      snakeY >= canvas.height ||
      snake.some((part) => part.x === newHead.x && part.y === newHead.y)
    ) {
      clearInterval(game);
      alert("Game Over! Your score: " + score);
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
  }

  let game = setInterval(draw, 100);
}

// Hook snake command into your terminal
const termOutput = document.getElementById("output");
const termInput = document.getElementById("termInput");

const oldListener = termInput.onkeydown; // backup

termInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = termInput.value.toLowerCase();
    if (cmd === "snake") {
      startSnakeGame();
    }
  }
});
