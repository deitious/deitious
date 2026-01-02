// Password check
function checkPassword() {
  const pass = document.getElementById('password').value;
  if(pass === 'kababy') {
    window.location.href = 'home.html';
  } else {
    alert('Incorrect password!');
  }
}

// Typewriter effect already in CSS, toggle visibility
function showMessage() {
  document.getElementById('message-box').classList.toggle('hidden');
}

// Show photo
function showPhoto() {
  document.getElementById('photo-container').classList.toggle('hidden');
}

// Cover animation (sparkles)
const coverCanvas = document.getElementById('cover-animation');
if(coverCanvas){
  const ctx = coverCanvas.getContext('2d');
  coverCanvas.width = window.innerWidth;
  coverCanvas.height = window.innerHeight;
  const stars = [];
  for(let i=0;i<100;i++){
    stars.push({x: Math.random()*coverCanvas.width, y: Math.random()*coverCanvas.height, r: Math.random()*2+1});
  }
  function drawStars(){
    ctx.clearRect(0,0,coverCanvas.width,coverCanvas.height);
    stars.forEach(s=>{
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle='white';
      ctx.fill();
      s.y += 0.5;
      if(s.y>coverCanvas.height) s.y=0;
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();
}

// Home animations (shooting stars)
const homeCanvas = document.getElementById('home-animation');
if(homeCanvas){
  const ctx = homeCanvas.getContext('2d');
  homeCanvas.width = window.innerWidth;
  homeCanvas.height = window.innerHeight;
  const stars=[];
  for(let i=0;i<150;i++){
    stars.push({x: Math.random()*homeCanvas.width, y: Math.random()*homeCanvas.height, r: Math.random()*2+1, dx: Math.random()*1-0.5, dy: Math.random()*1-0.5});
  }
  function drawHomeStars(){
    ctx.clearRect(0,0,homeCanvas.width,homeCanvas.height);
    stars.forEach(s=>{
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle='white';
      ctx.fill();
      s.x += s.dx; s.y += s.dy;
      if(s.x<0)s.x=homeCanvas.width;
      if(s.x>homeCanvas.width)s.x=0;
      if(s.y<0)s.y=homeCanvas.height;
      if(s.y>homeCanvas.height)s.y=0;
    });
    requestAnimationFrame(drawHomeStars);
  }
  drawHomeStars();
}
