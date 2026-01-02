// === PAGE REFERENCES ===
const cover = document.getElementById('cover');
const password = document.getElementById('password');
const home = document.getElementById('home');
const photosSection = document.getElementById('photos');
const songsSection = document.getElementById('songs');

const enterBtn = document.getElementById('enterBtn');
const passwordBtn = document.getElementById('passwordBtn');
const passwordInput = document.getElementById('passwordInput');

const photosBtn = document.getElementById('photosBtn');
const songsBtn = document.getElementById('songsBtn');
const envelopeBtn = document.getElementById('envelopeBtn');
const themeToggle = document.getElementById('themeToggle');

const backFromPhotos = document.getElementById('backFromPhotos');
const backFromSongs = document.getElementById('backFromSongs');

// === MODAL ===
const messageModal = document.getElementById('messageModal');
const closeModal = document.getElementById('closeModal');
const typewriterEl = document.getElementById('typewriter');

const messageText = "Kababy 💖, from the very first moment our paths crossed, I felt something I can't put into words, a spark, a light, a warmth that I never knew existed ✨. Every laugh we share, every quiet glance, every silly little moment becomes a treasure I hold close to my heart 🥰. You are the melody that plays softly in my mind when the world gets too loud, the spark that brightens the darkest days, and the warmth that makes everything feel alive 🌸. On this special day, your birthday 💌, I want you to know that my heart beats only for you ❤️. Every memory we've made is a page in a story I never want to end, a story where you are the hero, the magic, the dream I never want to wake from 🌟. Your smile is the sunrise that lights my soul, your voice the song I could listen to forever 🎶. Kababy, you are my laughter, my peace, my chaos, my calm, my dream, my reality 😍. Every day with you is a gift I unwrap again and again, and I promise to hold you, celebrate you, and cherish you for all the birthdays to come 🎉💖. Your heart is my home, your love my anchor, and your presence my everything 💞. Today, we celebrate you, the love of my life, the most beautiful soul I know ✨💌. Kababy, thank you for being you, the sweetest, brightest, most magical person in the universe 🌸💫. Happy Birthday, my love, my heart, my forever 😘 you are my everything, and I will love you endlessly 🥰💖";

// === INITIAL STATE ===
cover.style.display = 'flex';

// === COVER PAGE ENTER ===
enterBtn.addEventListener('click', () => {
    cover.style.display = 'none';
    password.style.display = 'flex';
});

// === PASSWORD CHECK ===
passwordBtn.addEventListener('click', () => {
    if(passwordInput.value.toLowerCase() === 'kababy'){
        password.style.display = 'none';
        home.style.display = 'flex';
    } else {
        passwordInput.value = '';
        passwordInput.placeholder = 'Wrong! Try again 😘';
    }
});

// === HOME BUTTONS ===
photosBtn.addEventListener('click', () => {
    home.style.display = 'none';
    photosSection.style.display = 'flex';
    loadPhotos();
});

songsBtn.addEventListener('click', () => {
    home.style.display = 'none';
    songsSection.style.display = 'flex';
    loadSongs();
});

// BACK BUTTONS
backFromPhotos.addEventListener('click', () => {
    photosSection.style.display = 'none';
    home.style.display = 'flex';
});
backFromSongs.addEventListener('click', () => {
    songsSection.style.display = 'none';
    home.style.display = 'flex';
});

// === SPECIAL MESSAGE ===
envelopeBtn.addEventListener('click', () => {
    messageModal.style.display = 'flex';
    typeWriterEffect(messageText);
});

closeModal.addEventListener('click', () => {
    messageModal.style.display = 'none';
    typewriterEl.textContent = '';
});

// === TYPEWRITER FUNCTION ===
function typeWriterEffect(text){
    typewriterEl.textContent = '';
    let i = 0;
    function type(){
        if(i < text.length){
            typewriterEl.textContent += text.charAt(i);
            i++;
            setTimeout(type, 25);
        }
    }
    type();
}

// === LOAD PHOTOS ===
function loadPhotos(){
    const photoGrid = document.getElementById('photoGrid');
    photoGrid.innerHTML = '';
    const photoFiles = [
        "IMG-20251202-WA0015.jpg","IMG-20251202-WA0020.jpg","IMG-20251202-WA0021.jpg",
        "IMG-20251220-WA0001.jpg","IMG_20251130_233135.jpg","IMG_20251213_011711.jpg",
        "IMG_20251229_02385133.jpeg","IMG_20260101_142848.jpg","IMG_20260101_193619.jpg",
        "Screenshot_2025-10-18-17-16-33-95_6012fa4d4ddec268fc5c7112cbb265e7.jpg",
        "Screenshot_2025-11-15-22-26-27-53_6012fa4d4ddec268fc5c7112cbb265e7.jpg",
        "Snapchat-1159969629.jpg","Snapchat-145432682.jpg","Snapchat-1939619528.jpg",
        "Snapchat-2049032906.jpg","Snapchat-2145856260.jpg"
    ];

    photoFiles.forEach(file => {
        const div = document.createElement('div');
        div.className = 'photo-envelope';
        con
