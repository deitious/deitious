// ---------- Me n U - main script (module not required) ----------

// Firebase config (from your project)
const firebaseConfig = {
  apiKey: "AIzaSyBEZhmdOhuL8Kql4VLVpmrKxr3Yvj0pJgw",
  authDomain: "me--n--u.firebaseapp.com",
  projectId: "me--n--u",
  storageBucket: "me--n--u.firebasestorage.app",
  messagingSenderId: "912553010351",
  appId: "1:912553010351:web:a7f36503a271fed974a05a",
  measurementId: "G-G7L91926LF"
};

// initialize firebase (compat scripts loaded in HTML)
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  // services
  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();
} else {
  console.warn('Firebase SDK not loaded - running local-only mode.');
}

// App state
const ALLOWED = ['kababy','jagiya'];
let currentUser = null;
let uid = null;
let activeView = 'home';
let typingTimer = null;

// DOM
const splash = document.getElementById('splash');
const lockScreen = document.getElementById('lockScreen');
const pw = document.getElementById('pw');
const pwBtn = document.getElementById('pwBtn');
const pwMsg = document.getElementById('pwMsg');
const appDiv = document.getElementById('app');
const greeting = document.getElementById('greeting');
const profilePic = document.getElementById('profilePic');
const profileInput = document.getElementById('profileInput');
const displayName = document.getElementById('displayName');
const sideIcons = document.querySelectorAll('.side-icon');
const views = {
  home: document.getElementById('homeView'),
  gallery: document.getElementById('galleryView'),
  music: document.getElementById('musicView'),
  chat: document.getElementById('chatView'),
  notes: document.getElementById('notesView')
};
const addImageBtn = document.getElementById('addImageBtn');
const galleryGrid = document.getElementById('galleryGrid');
const addMusicBtn = document.getElementById('addMusicBtn');
const musicList = document.getElementById('musicList');
const noteArea = document.getElementById('noteArea');
const saveNote = document.getElementById('saveNote');
const clearNote = document.getElementById('clearNote');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const attachBtn = document.getElementById('attachBtn');
const attachInput = document.getElementById('attachInput');
const chatList = document.getElementById('chatList');
const typingIndicator = document.getElementById('typingIndicator');

// hidden additions if missing
const hiddenGalleryInput = (() => {
  let el = document.getElementById('galleryInput');
  if (!el) { el = document.createElement('input'); el.type='file'; el.accept='image/*'; el.multiple=true; el.id='galleryInput'; el.hidden=true; document.body.appendChild(el); }
  return el;
})();
const hiddenMusicInput = (() => {
  let el = document.getElementById('musicInput');
  if (!el) { el = document.createElement('input'); el.type='file'; el.accept='audio/*'; el.multiple=true; el.id='musicInput'; el.hidden=true; document.body.appendChild(el); }
  return el;
})();

// helpers
function toast(text, t=1600){ pwMsg.textContent = text; setTimeout(()=> pwMsg.textContent = '', t); }
function showView(name){
  activeView = name;
  Object.keys(views).forEach(k=>views[k].classList.toggle('active', k===name));
  // shrink DP when not home
  if (name !== 'home') profilePic.classList.add('shrunk'); else profilePic.classList.remove('shrunk');
  // set active sidebar
  sideIcons.forEach(b => b.classList.toggle('active', b.dataset.view===name));
  if (name === 'chat') loadChat();
  if (name === 'gallery') loadGallery();
  if (name === 'music') loadMusic();
}

// Initialize: password gate
pwBtn.onclick = async () => {
  const val = (pw.value||'').trim().toLowerCase();
  if (!ALLOWED.includes(val)) { toast('Wrong heart key — try again',2200); pw.value=''; return; }
  currentUser = val;
  displayName.textContent = currentUser;
  greeting.textContent = `Hey ${currentUser}`;
  lockScreen.style.display='none';
  appDiv.style.display='block';
  // init firebase auth (anonymous) if firebase loaded
  if (typeof firebase !== 'undefined') {
    try {
      const res = await firebase.auth().signInAnonymously();
      uid = res.user.uid;
      // set presence doc
      await firebase.firestore().collection('presence').doc(currentUser).set({ online:true, lastSeen: firebase.firestore.FieldValue.serverTimestamp() });
      window.addEventListener('beforeunload', ()=> { firebase.firestore().collection('presence').doc(currentUser).set({ online:false, lastSeen: firebase.firestore.FieldValue.serverTimestamp() }); });
    } catch(e){ console.warn('anon auth failed', e); }
  }
  // restore local profile
  const prof = localStorage.getItem('mn_profile_'+currentUser);
  if (prof) profilePic.style.backgroundImage = `url(${prof})`;
  // load saved
  noteArea.value = localStorage.getItem('mn_notes') || '';
  loadGallery(); loadMusic(); loadChat();
  setTimeout(()=> splash.style.display='none', 400);
};

// Theme toggle (simple switch)
const themeBtn = document.getElementById('themeBtn');
themeBtn.onclick = () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('mn_theme', isLight ? 'light':'dark');
};
if (localStorage.getItem('mn_theme') === 'light') document.body.classList.add('light');

// Navigation
sideIcons.forEach(b => b.addEventListener('click', ()=> showView(b.dataset.view)));

// Profile pic change
profilePic.onclick = ()=> profileInput.click();
profileInput.onchange = async (e) => {
  const file = e.target.files[0]; if (!file) return;
  const url = await uploadToStorage(file, `profiles/${Date.now()}_${file.name}`);
  profilePic.style.backgroundImage = `url(${url})`;
  localStorage.setItem('mn_profile_'+currentUser, url);
  // update remote profile doc
  if (typeof firebase !== 'undefined') {
    await firebase.firestore().collection('users').doc(currentUser).set({ displayName: currentUser, photoURL: url, updated: firebase.firestore.FieldValue.serverTimestamp() });
  }
};

// uploads helpers (use storage if available, otherwise dataURL fallback)
async function uploadToStorage(file, path) {
  if (typeof firebase === 'undefined' || !firebase.storage) {
    // local fallback to dataURL
    return await new Promise((res,rej)=>{ const fr = new FileReader(); fr.onload = ()=> res(fr.result); fr.onerror = rej; fr.readAsDataURL(file); });
  }
  const ref = firebase.storage().ref().child(path);
  const snap = await ref.put(file);
  return await snap.ref.getDownloadURL();
}

// Gallery: upload
addImageBtn && (addImageBtn.onclick = ()=> hiddenGalleryInput.click());
hiddenGalleryInput.onchange = async (e) => {
  for (let f of e.target.files){
    const url = await uploadToStorage(f, `uploads/images/${Date.now()}_${f.name}`);
    // save metadata to Firestore OR localStorage fallback
    if (typeof firebase !== 'undefined') {
      await firebase.firestore().collection('uploads').add({ type:'image', url, name:f.name, uploader:currentUser, ts: firebase.firestore.FieldValue.serverTimestamp() });
    } else {
      const arr = JSON.parse(localStorage.getItem('mn_gallery')||'[]'); arr.unshift({url,name:f.name, uploader:currentUser, ts: Date.now()}); localStorage.setItem('mn_gallery', JSON.stringify(arr)); renderGalleryItem({url,name:f.name});
    }
  }
  e.target.value='';
};

function renderGalleryItem(item){
  const wrap = document.createElement('div'); wrap.className='gallery-item';
  const img = document.createElement('img'); img.src = item.url; wrap.appendChild(img);
  galleryGrid.prepend(wrap);
}
async function loadGallery(){
  galleryGrid.innerHTML='';
  if (typeof firebase !== 'undefined') {
    const snap = await firebase.firestore().collection('uploads').where('type','==','image').orderBy('ts','desc').get();
    snap.forEach(d => renderGalleryItem(d.data()));
  } else {
    const arr = JSON.parse(localStorage.getItem('mn_gallery')||'[]');
    arr.forEach(renderGalleryItem);
  }
}

// Music
addMusicBtn && (addMusicBtn.onclick = ()=> hiddenMusicInput.click());
hiddenMusicInput.onchange = async (e) => {
  for (let f of e.target.files){
    const url = await uploadToStorage(f, `uploads/music/${Date.now()}_${f.name}`);
    if (typeof firebase !== 'undefined') {
      await firebase.firestore().collection('uploads').add({ type:'audio', url, name:f.name, uploader:currentUser, ts: firebase.firestore.FieldValue.serverTimestamp() });
    } else {
      const arr = JSON.parse(localStorage.getItem('mn_music')||'[]'); arr.unshift({url,name:f.name, uploader:currentUser, ts: Date.now()}); localStorage.setItem('mn_music', JSON.stringify(arr)); renderMusicItem({url,name:f.name});
    }
  }
  e.target.value='';
};
function renderMusicItem(item){
  const div = document.createElement('div'); div.className='song';
  div.innerHTML = `<div style="flex:1">${item.name}</div><audio controls src="${item.url}"></audio>`;
  musicList.prepend(div);
}
async function loadMusic(){
  musicList.innerHTML='';
  if (typeof firebase !== 'undefined') {
    const snap = await firebase.firestore().collection('uploads').where('type','==','audio').orderBy('ts','desc').get();
    snap.forEach(d => renderMusicItem(d.data()));
  } else {
    const arr = JSON.parse(localStorage.getItem('mn_music')||'[]'); arr.forEach(renderMusicItem);
  }
}

// Notes
saveNote && (saveNote.onclick = ()=> { localStorage.setItem('mn_notes', noteArea.value); toast('Saved'); if (typeof firebase !== 'undefined') firebase.firestore().collection('notes').doc('shared').set({ text: noteArea.value, updated: firebase.firestore.FieldValue.serverTimestamp() }); });
clearNote && (clearNote.onclick = ()=> { if (confirm('Clear notes?')){ noteArea.value=''; localStorage.removeItem('mn_notes'); if (typeof firebase !== 'undefined') firebase.firestore().collection('notes').doc('shared').set({ text:'', updated: firebase.firestore.FieldValue.serverTimestamp() }); toast('Cleared'); } });

// Chat core: send text / send image
sendBtn.onclick = async () => {
  const text = (messageInput.value||'').trim(); if (!text) return;
  const msg = { type:'text', text, sender: currentUser, ts: firebase && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : new Date(), seenBy: [] };
  if (typeof firebase !== 'undefined') await firebase.firestore().collection('messages').add(msg); else { saveLocalMessage(msg); renderMessageLocal(msg); }
  messageInput.value='';
};

attachBtn.onclick = ()=> attachInput.click();
attachInput.onchange = async (e) => {
  for (let f of e.target.files){
    const url = await uploadToStorage(f, `chat/images/${Date.now()}_${f.name}`);
    const msg = { type:'image', url, sender: currentUser, ts: firebase && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : new Date(), seenBy: [] };
    if (typeof firebase !== 'undefined') await firebase.firestore().collection('messages').add(msg); else { saveLocalMessage(msg); renderMessageLocal(msg); }
  }
  e.target.value='';
};

// local message fallback
function saveLocalMessage(m){
  const arr = JSON.parse(localStorage.getItem('mn_local_msgs')||'[]'); m.localId = 'l'+Date.now(); arr.push(m); localStorage.setItem('mn_local_msgs', JSON.stringify(arr));
}
function loadLocalMessages(){ return JSON.parse(localStorage.getItem('mn_local_msgs')||'[]'); }

// realtime listener for messages
function listenMessages(){
  if (typeof firebase === 'undefined') {
    loadLocalMessages().forEach(renderMessageLocal);
    return;
  }
  firebase.firestore().collection('messages').orderBy('ts','asc').onSnapshot(snap => {
    snap.docChanges().forEach(change => {
      const data = change.doc.data(); data._id = change.doc.id;
      if (change.type === 'added') renderMessageRemote(data);
      if (change.type === 'modified') updateRenderedMessage(data);
      if (change.type === 'removed') removeRenderedMessage(data._id);
    });
  });
}
function loadChat(){ chatList.innerHTML=''; listenMessages(); markAllSeen(); }

// render helpers
function createMessageEl(obj){ 
  const el = document.createElement('div'); el.className = 'chat-bubble ' + (obj.sender===currentUser ? 'me':'' ); el.dataset.id = obj._id || obj.localId || '';
  if (obj.type === 'text') el.innerHTML = `<div class="msg-text">${escapeHtml(obj.text)}</div><div class="chat-meta">${obj.sender} • ${formatTime(obj.ts)} ${renderSeenDots(obj)}</div>`;
  if (obj.type === 'image') el.innerHTML = `<div class="msg-img"><img src="${obj.url}" alt="img" style="max-width:240px;border-radius:8px"></div><div class="chat-meta">${obj.sender} • ${formatTime(obj.ts)} ${renderSeenDots(obj)}</div>`;
  // actions if owner
  if (obj.sender === currentUser) {
    const actions = document.createElement('div'); actions.style.position='absolute'; actions.style.right='6px'; actions.style.top='6px';
    const edit = document.createElement('button'); edit.textContent='✎'; edit.title='Edit'; edit.onclick = ()=> editMessage(obj);
    const delAll = document.createElement('button'); delAll.textContent='🗑'; delAll.title='Delete for everyone'; delAll.onclick = ()=> deleteForEveryone(obj);
    const delMe = document.createElement('button'); delMe.textContent='⬇'; delMe.title='Delete for me'; delMe.onclick = ()=> deleteForMe(obj);
    actions.appendChild(edit); actions.appendChild(delAll); actions.appendChild(delMe);
    el.appendChild(actions);
  }
  return el;
}
function renderMessageLocal(m){ if (m._id && document.querySelector(`.chat-bubble[data-id="${m._id}"]`)) return; const el = createMessageEl(m); chatList.appendChild(el); chatList.scrollTop = chatList.scrollHeight; }
function renderMessageRemote(m){ if (m._id && document.querySelector(`.chat-bubble[data-id="${m._id}"]`)) return; const el = createMessageEl(m); chatList.appendChild(el); chatList.scrollTop = chatList.scrollHeight; }
function updateRenderedMessage(m){ const sel = document.querySelector(`.chat-bubble[data-id="${m._id}"]`); if (!sel) return; sel.querySelector('.msg-text') && (sel.querySelector('.msg-text').innerText = m.text || ''); }
function removeRenderedMessage(id){ const sel = document.querySelector(`.chat-bubble[data-id="${id}"]`); if (sel) sel.remove(); }
function deleteForEveryone(m){ if (!confirm('Delete message for everyone?')) return; if (m._id && typeof firebase !== 'undefined') firebase.firestore().collection('messages').doc(m._id).delete(); else { let arr = loadLocalMessages(); arr = arr.filter(x=> x.localId !== m.localId); localStorage.setItem('mn_local_msgs', JSON.stringify(arr)); location.reload(); } }
function deleteForMe(m){ const hidden = JSON.parse(localStorage.getItem('mn_hidden')||'[]'); hidden.push(m._id || m.localId); localStorage.setItem('mn_hidden', JSON.stringify(hidden)); removeRenderedMessage(m._id || m.localId); }
function editMessage(m){ const newText = prompt('Edit message', m.text||''); if (newText === null) return; if (m._id && typeof firebase !== 'undefined') firebase.firestore().collection('messages').doc(m._id).update({ text: newText, edited: true }); else { let arr = loadLocalMessages(); const it = arr.find(i=>i.localId===m.localId); if (it){ it.text = newText; localStorage.setItem('mn_local_msgs', JSON.stringify(arr)); location.reload(); } } }

// seen / typing / online helpers
function markAllSeen(){
  if (typeof firebase === 'undefined') return;
  // mark messages seen by currentUser
  const q = firebase.firestore().collection('messages').where('sender','!=',currentUser);
  q.get().then(snap => {
    snap.forEach(doc => {
      const data = doc.data(); const id = doc.id;
      const seen = data.seenBy || [];
      if (!seen.includes(currentUser)){
        firebase.firestore().collection('messages').doc(id).update({ seenBy: firebase.firestore.FieldValue.arrayUnion(currentUser) });
      }
    });
  });
}
function renderSeenDots(m){
  const seen = m.seenBy || [];
  // show one tick if saved, two ticks if both users have seen (simple)
  const meSeen = seen.includes(currentUser);
  const otherSeen = seen.length > (meSeen?1:0);
  if (!seen.length) return '';
  if (meSeen && otherSeen) return '✅✅';
  if (meSeen) return '✅';
  return '';
}

messageInput.oninput = () => {
  typingIndicator.textContent = `${currentUser} is typing...`;
  if (typeof firebase !== 'undefined') firebase.firestore().collection('typing').doc('chat').set({ user: currentUser, ts: firebase.firestore.FieldValue.serverTimestamp() });
  clearTimeout(typingTimer); typingTimer = setTimeout(()=> { typingIndicator.textContent=''; if (typeof firebase !== 'undefined') firebase.firestore().collection('typing').doc('chat').delete().catch(()=>{}); }, 1200);
}

// listen for typing doc changes
if (typeof firebase !== 'undefined') {
  firebase.firestore().collection('typing').doc('chat').onSnapshot(doc => {
    if (!doc.exists) { typingIndicator.textContent=''; return; }
    const d = doc.data(); if (d.user && d.user !== currentUser) typingIndicator.textContent = `${d.user} is typing...`;
    setTimeout(()=> typingIndicator.textContent = '', 1200);
  });
}

// listen to presence (online/offline)
if (typeof firebase !== 'undefined') {
  firebase.firestore().collection('presence').onSnapshot(snap => {
    // optional: show small status somewhere
  });
}

// utilities
function escapeHtml(s){ return (s||'').replace(/[&<>"'`]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'})[c]); }
function formatTime(ts){ try{ const d = ts && ts.toDate ? ts.toDate() : new Date(ts || Date.now()); return d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});}catch(e){return ''} }

// initial view + listeners
showView('home');
document.getElementById('homeBtn').addEventListener('click', ()=> showView('home'));
document.getElementById('addImageBtn')?.addEventListener('click', ()=> hiddenGalleryInput.click());
document.getElementById('addMusicBtn')?.addEventListener('click', ()=> hiddenMusicInput.click());

// start listening to remote messages
setTimeout(()=> {
  listenMessages();
  // hide splash
  setTimeout(()=> splash.style.display='none', 400);
}, 500);
