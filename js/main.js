
/* main.js - modernized interactions */

// Timer (calendar-aware)
function startTimer() {
  const el = document.getElementById('cronometro');
  const start = new Date('2024-10-19T00:00:00');

  function update() {
    const now = new Date();
    let y1 = start.getFullYear(), m1 = start.getMonth(), d1 = start.getDate();
    let y2 = now.getFullYear(), m2 = now.getMonth(), d2 = now.getDate();
    let years = y2 - y1, months = m2 - m1, days = d2 - d1;
    if (days < 0) { const prev = new Date(y2, m2, 0); days += prev.getDate(); months--; }
    if (months < 0) { months += 12; years--; }
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sinceMidnightMs = now - startOfToday;
    const hours = Math.floor(sinceMidnightMs / (1000*60*60));
    const minutes = Math.floor((sinceMidnightMs / (1000*60)) % 60);
    const seconds = Math.floor((sinceMidnightMs / 1000) % 60);
    el.textContent = `${years} ano${years!==1?'s':''} ${months} mes${months!==1?'es':''} ${days} dia${days!==1?'s':''} ${hours}h ${minutes}m ${seconds}s`;
  }
  update();
  setInterval(update,1000);
}

// Slideshow simple swap for hero
function startHeroSlideshow() {
  const imgs = [];
  // try to load images from Images/ directory (img1,img2,img3...)
  for (let i=1;i<=8;i++) imgs.push(`Images/img${i}.jpeg`);
  const imgEl = document.getElementById('heroImage');
  let idx = 0;
  function change(){
    const src = imgs[idx];
    imgEl.src = src;
    idx = (idx+1)%imgs.length;
  }
  change();
  setInterval(change,6000);
}

// Modal for video playback
function setupVideoModal(){
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const closeBtn = modal.querySelector('.modal-close');

  document.getElementById('videoGrid').addEventListener('click', (e)=>{
    const thumb = e.target.closest('.thumb');
    if (!thumb) return;
    const img = thumb.querySelector('img');
    const videoSrc = img && img.dataset && img.dataset.video ? img.dataset.video : img.getAttribute('data-video') || img.dataset.src || img.src;
    if (!videoSrc) return;
    modalVideo.src = videoSrc;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
    modalVideo.play().catch(()=>{});
  });

  function close(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    modalVideo.pause();
    modalVideo.src = '';
  }
  closeBtn.addEventListener('click',close);
  modal.addEventListener('click',(e)=>{ if (e.target === modal) close(); });
  document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') close(); });
}

// Motivos button (random alert)
function setupMotivos(){
  const motivos = [
    "Porque você me faz sorrir todos os dias.",
    "Porque você é a pessoa mais especial da minha vida.",
    "Porque você me inspira a ser melhor.",
    "Porque você me entende como ninguém.",
    "Porque você ilumina meus dias com seu amor.",
    "Porque você é minha melhor companhia."
  ];
  document.getElementById('motivoBtn').addEventListener('click', ()=>{
    const m = motivos[Math.floor(Math.random()*motivos.length)];
    // Fancy small modal instead of alert
    const div = document.createElement('div');
    div.style.position='fixed';div.style.left='50%';div.style.top='18%';div.style.transform='translateX(-50%)';div.style.background='linear-gradient(90deg,#fff,#ffe6ea)';div.style.color='#111';div.style.padding='14px 18px';div.style.borderRadius='12px';div.style.boxShadow='0 8px 30px rgba(0,0,0,0.3)';div.style.zIndex=99999;div.textContent=m;
    document.body.appendChild(div);
    setTimeout(()=>{ div.style.opacity=0; setTimeout(()=>div.remove(),600); },2200);
  });
}

// Audio autoplay attempt with fallback
function setupAudioAutoplay(){
  const audio = document.getElementById('mainAudio');
  const playBtn = document.getElementById('playMusicBtn');
  function tryPlay(){
    audio.play().then(()=>{
      // playing
      playBtn.textContent = 'Tocando 🎵';
    }).catch(()=>{
      // blocked: show cue to user
      playBtn.textContent = 'Clique para tocar';
    });
  }
  // user wanted autoplay; try immediately
  tryPlay();

  playBtn.addEventListener('click', ()=>{
    audio.play().then(()=> playBtn.textContent = 'Tocando 🎵').catch(()=> playBtn.textContent = 'Erro ao tocar');
  });
}

// Initialize all
document.addEventListener('DOMContentLoaded', ()=>{
  startTimer();
  startHeroSlideshow();
  setupVideoModal();
  setupMotivos();
  setupAudioAutoplay();
});
