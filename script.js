// ELEMENTS
const cover = document.getElementById('cover');
const enterBtn = document.getElementById('enterBtn');
const passwordSection = document.getElementById('password-section');
const unlockBtn = document.getElementById('unlockBtn');
const home = document.getElementById('home');
const messageIcon = document.getElementById('messageIcon');
const message = document.getElementById('message');

// COVER ENTER BUTTON
enterBtn.addEventListener('click', () => {
  cover.classList.add('hidden');
  passwordSection.classList.remove('hidden');
});

// PASSWORD UNLOCK
unlockBtn.addEventListener('click', () => {
  const pass = document.getElementById('password').value;
  if(pass === "kababy") {
    passwordSection.classList.add('hidden');
    home.classList.remove('hidden');
    startHomeAnimations();
  } else {
    alert("Wrong password 😅");
  }
});

// MESSAGE ICON
messageIcon.addEventListener('click', () => {
  const kababyMessage = `Kababy 💖, from the very first moment our paths crossed, I felt something I can't put into words, a spark, a light, a warmth that I never knew existed ✨. Every laugh we share, every quiet glance, every silly little moment becomes a treasure I hold close to my heart 🥰. You are the melody that plays softly in my mind when the world gets too loud, the spark that brightens the darkest days, and the warmth that makes everything feel alive 🌸. On this special day, your birthday 💌, I want you to know that my heart beats only for you ❤️. Every memory we've made is a page in a story I never want to end, a story where you are the hero, the magic, the dream I never want to wake from 🌟. Your smile is the sunrise that lights my soul, your voice the song I could listen to forever 🎶. Kababy, you are my laughter, my peace, my chaos, my calm, my dream, my reality 😍. Every day with you is a gift I unwrap again and again, and I promise to hold you, celebrate you, and cherish you for all the birthdays to come 🎉💖. Your heart is my home, your love my anchor, and your presence my everything 💞. Today, we celebrate you, the love of my life, the most beautiful soul I know ✨💌. Kababy, thank you for being you, the sweetest, brightest, most magical person in the universe 🌸💫. Happy Birthday, my love, my heart, my forever 😘 you are my everything, and I will love you endlessly 🥰💖`;
  message.textContent = kababyMessage;
  message.classList.remove('hidden');
});

// HOME ANIMATIONS
function startHomeAnimations() {
  // SHOOTING STARS
  const starsContainer = document.querySelector('.shooting-stars');
  for(let i=0;i<30;i++){
    const star = document.createElement('div');
    star.className='star';
    star.style.left=Math.random()*100+'%';
    star.style.animationDuration=(Math.random()*2+1)+'s';
    starsContainer.appendChild(star);
  }

  // DIAMOND RAIN
  const diamondContainer = document.querySelector('.diamond-rain');
  for(let i=0;i<20;i++){
    const d = document.createElement('div');
    d.className='diamond';
    d.style.left=Math.random()*100+'%';
    d.style.animationDuration=(Math.random()*3+2)+'s';
    diamondContainer.appendChild(d);
  }

  // FIREWORKS placeholder
  const fireworksContainer = document.querySelector('.fireworks');
  // You can later add actual fireworks animation here
}
