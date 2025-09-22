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
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

yesBtn.addEventListener("click", () => {
  message.innerHTML = "Nessy said YES! 🎉❤️";
  spawnHeart(window.innerWidth / 2, window.innerHeight / 2);
});

// Runaway NO button
noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});

// Hearts effect
const heartsContainer = document.createElement("div");
heartsContainer.style.position = "fixed";
heartsContainer.style.top = 0;
heartsContainer.style.left = 0;
heartsContainer.style.width = "100%";
heartsContainer.style.height = "100%";
heartsContainer.style.pointerEvents = "none";
document.body.appendChild(heartsContainer);

function spawnHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heartsContainer.appendChild(heart);
  animateHeart(heart);

  // chain reaction hearts
  for (let i = 0; i < 5; i++) {
    const offsetX = (Math.random() - 0.5) * 150;
    const offsetY = (Math.random() - 0.5) * 150;
    setTimeout(() => {
      const miniHeart = document.createElement("div");
      miniHeart.className = "heart";
      miniHeart.style.left = `${x + offsetX}px`;
      miniHeart.style.top = `${y + offsetY}px`;
      heartsContainer.appendChild(miniHeart);
      animateHeart(miniHeart);
    }, i * 200);
  }
}

function animateHeart(heart) {
  const duration = 3000;
  const animation = heart.animate([
    { transform: "scale(1) rotate(45deg)", opacity: 1 },
    { transform: "scale(1.5) rotate(45deg) translateY(-100px)", opacity: 0 }
  ], {
    duration,
    easing: "ease-out"
  });

  animation.onfinish = () => heart.remove();
}
