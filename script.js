// Pages
const cover = document.getElementById('cover');
const enterBtn = document.getElementById('enterBtn');
const password = document.getElementById('password');
const passInput = document.getElementById('passInput');
const passBtn = document.getElementById('passBtn');
const passMsg = document.getElementById('passMsg');
const home = document.getElementById('home');

// Theme
const themeToggle = document.getElementById('themeToggle');

// Envelope
const msgBtn = document.getElementById('msgBtn');
const messageBox = document.getElementById('messageBox');
const closeMsg = document.getElementById('closeMsg');
const typewriter = document.getElementById('typewriter');

let message = `Kababy 💖, from the very first moment our paths crossed, I felt something I can't put into words, a spark, a light, a warmth that I never knew existed ✨. Every laugh we share, every quiet glance, every silly little moment becomes a treasure I hold close to my heart 🥰. You are the melody that plays softly in my mind when the world gets too loud, the spark that brightens the darkest days, and the warmth that makes everything feel alive 🌸. On this special day, your birthday 💌, I want you to know that my heart beats only for you ❤️. Every memory we've made is a page in a story I never want to end, a story where you are the hero, the magic, the dream I never want to wake from 🌟. Your smile is the sunrise that lights my soul, your voice the song I could listen to forever 🎶. Kababy, you are my laughter, my peace, my chaos, my calm, my dream, my reality 😍. Every day with you is a gift I unwrap again and again, and I promise to hold you, celebrate you, and cherish you for all the birthdays to come 🎉💖. Your heart is my home, your love my anchor, and your presence my everything 💞. Today, we celebrate you, the love of my life, the most beautiful soul I know ✨💌. Kababy, thank you for being you, the sweetest, brightest, most magical person in the universe 🌸💫. Happy Birthday, my love, my heart, my forever 😘 you are my everything, and I will love you endlessly 🥰💖`;

// Typewriter
function typeWriter(text, el, speed=20){
  el.textContent = '';
  let i=0;
  function typing(){ 
    if(i<text.length){ el.textContent += text.charAt(i++); setTimeout(typing, speed); }
  }
  typing();
}

// Cover Enter
enterBtn.addEventListener('click',()=>{ cover.classList.remove('active'); password.classList.add('active'); });

// Password
passBtn.addEventListener('click',()=>{
  if(passInput.value.toLowerCase()==='kababy'){ 
    password.classList.remove('active'); 
    home.classList.add('active'); 
  } else { passMsg.textContent = 'Wrong password 😢'; }
});

// Theme Toggle
themeToggle.addEventListener('click',()=>{ document.body.classList.toggle('dark'); });

// Envelope
msgBtn.addEventListener('click',()=>{
  messageBox.style.display='block';
  typeWriter(message,typewriter);
});
closeMsg.addEventListener('click',()=>{ messageBox.style.display='none'; });

// Photos
const photosGrid = document.getElementById('photosGrid');
const photoFiles = Array.from(document.querySelectorAll('assets/photos/*')); // placeholder
const photoPaths = ['assets/photos/IMG-20251202-WA0015.jpg','assets/photos/IMG-20251202-WA0020.jpg','assets/photos/IMG-20251202-WA0021.jpg','assets/photos/IMG-20251220-WA0001.jpg','assets/photos/IMG_20251130_233135.jpg','assets/photos/IMG_20251213_011711.jpg','assets/photos/IMG_20251229_02385133.jpeg','assets/photos/IMG_20260101_142848.jpg','assets/photos/IMG_20260101_193619.jpg','assets/photos/Screenshot_2025-10-18-17-16-33-95_6012fa4d4ddec268fc5c7112cbb265e7.jpg','assets/photos/Screenshot_2025-11-15-22-26-27-53_6012fa4d4ddec268fc5c7112cbb265e7.jpg','assets/photos/Snapchat-1159969629.jpg','assets/photos/Snapchat-145432682.jpg','assets/photos/Snapchat-1939619528.jpg','assets/photos/Snapchat-2049032906.jpg','assets/photos/Snapchat-2145856260.jpg'];
photoPaths.forEach(p=>{
  let img = document.createElement('img'); img.src=p; photosGrid.appendChild(img);
});

// Songs
const songsList = document.getElementById('songsList');
const songPaths = ['assets/B_Young_-_R_Drill__Official_Video_(48k).mp3','assets/Justin Timberlake - Mirrors _Official Music Video_.mp3','assets/Shayne Ward - Breathless (Video).mp3','assets/Trevor Daniel - Falling (Official Music Video).mp3','assets/Trevor Daniel - For You (Official Audio).mp3'];
songPaths.forEach(s=>{
  let audio = document.createElement('audio'); audio.src=s; audio.controls=true; songsList.appendChild(audio);
});
