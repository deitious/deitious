// Slideshow
const images = ["pics/photo1.jpg", "pics/photo2.jpg", "pics/photo3.jpg", "pics/photo4.jpg"];
let index = 0;
const slide = document.getElementById("slide");

setInterval(() => {
  index = (index + 1) % images.length;
  slide.src = images[index];
}, 3000);

// Buttons
const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const message = document.getElementById("message");

yesBtn.addEventListener("click", () => {
  message.innerHTML = "Agnes said YES! 🎉❤️";
  startConfetti();
});

maybeBtn.addEventListener("click", () => {
  message.innerHTML = "Okay Agnes... I’ll ask again tomorrow 😅❤️";
});

// Simple confetti effect
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = [];
function startConfetti() {
  confetti = [];
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 100,
      color: `hsl(${Math.random()*360}, 100%, 50%)`,
      tilt: Math.floor(Math.random() * 10) - 10
    });
  }
  drawConfetti();
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.fillStyle = c.color;
    ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
    ctx.fill();
  });
  updateConfetti();
  requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
  confetti.forEach(c => {
    c.y += Math.cos(c.d) + 1 + c.r/2;
    c.x += Math.sin(c.d);
    if (c.y > confettiCanvas.height) {
      c.y = -10;
      c.x = Math.random() * confettiCanvas.width;
    }
  });
}
