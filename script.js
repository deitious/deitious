// === PAGE REFERENCES ===
const cover = document.getElementById('cover');
const password = document.getElementById('password');
const home = document.getElementById('home');
const photos = document.getElementById('photos');
const song = document.getElementById('song');

const enterBtn = document.getElementById('enterBtn');
const passwordBtn = document.getElementById('passwordBtn');
const passwordInput = document.getElementById('passwordInput');

const photosBtn = document.getElementById('photosBtn');
const songBtn = document.getElementById('songBtn');
const envelopeBtn = document.getElementById('envelopeBtn');

const backFromPhotos = document.getElementById('backFromPhotos');
const backFromSong = document.getElementById('backFromSong');

// MODAL
const messageModal = document.getElementById('messageModal');
const closeModal = document.getElementById('closeModal');
const typewriterEl = document.getElementById('typewriter');

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
    photos.style.display = 'flex';
    loadPhotos();
});

songBtn.addEventListener('click', () => {
    home.style.display = 'none';
    song.style.display = 'flex';
});

// BACK BUTTONS
backFromPhotos.addEventListener('click', () => {
    photos.style.display = 'none';
    home.style.display = 'flex';
});
backFromSong.addEventListener('click', () => {
    song.style.display = 'none';
    home.style.display = 'flex';
});

// === SPECIAL MESSAGE ===
envelopeBtn.addEventListener('click', () => {
    messageModal.style.display = 'flex';
    typeWriterEffect("Happy Birthday Bree 💖\nYou are my everything 😘");
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
            setTimeout(type, 50);
        }
    }
    type();
}

// === LOAD PHOTOS DYNAMICALLY ===
function loadPhotos(){
    const photoGrid = document.getElementById('photoGrid');
    photoGrid.innerHTML = ''; // clear previous

    const photoFiles = [
        "IMG-20251202-WA0015.jpg",
        "IMG-20251202-WA0020.jpg",
        "IMG-20251202-WA0021.jpg",
        "IMG-20251220-WA0001.jpg",
        "IMG_20251130_233135.jpg",
        "IMG_20251213_011711.jpg",
        "IMG_20251229_02385133.jpeg",
        "IMG_20260101_142848.jpg",
        "IMG_20260101_193619.jpg",
        "Screenshot_2025-10-18-17-16-33-95_6012fa4d4ddec268fc5c7112cbb265e7.jpg",
        "Screenshot_2025-11-15-22-26-27-53_6012fa4d4ddec268fc5c7112cbb265e7.jpg",
        "Snapchat-1159969629.jpg",
        "Snapchat-145432682.jpg",
        "Snapchat-1939619528.jpg",
        "Snapchat-2049032906.jpg",
        "Snapchat-2145856260.jpg"
    ];

    photoFiles.forEach(file => {
        const div = document.createElement('div');
        div.className = 'photo-envelope';
        const img = document.createElement('img');
        img.src = `assets/photos/${file}`;
        div.appendChild(img);
        photoGrid.appendChild(div);
    });
}
