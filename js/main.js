// Timer aprimorado
function startTimer() {
    const timerElement = document.getElementById('cronometro');
    const startDate = new Date('2024-10-19T00:00:00');

    function updateTimer() {
        const now = new Date();
        let y1 = startDate.getFullYear(), m1 = startDate.getMonth(), d1 = startDate.getDate();
        let y2 = now.getFullYear(), m2 = now.getMonth(), d2 = now.getDate();
        let years = y2 - y1, months = m2 - m1, days = d2 - d1;

        if (days < 0) {
            const prevMonth = new Date(y2, m2, 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const sinceMidnightMs = now - startOfToday;
        const hours = Math.floor(sinceMidnightMs / (1000 * 60 * 60));
        const minutes = Math.floor((sinceMidnightMs / (1000 * 60)) % 60);
        const seconds = Math.floor((sinceMidnightMs / 1000) % 60);

        timerElement.textContent = `${years} ano${years !== 1 ? 's' : ''} ${months} mes${months !== 1 ? 'es' : ''} ${days} dia${days !== 1 ? 's' : ''} ${hours}h ${minutes}m ${seconds}s`;
    }
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Slideshow com pausa e pré-carregamento
function startSlideshow() {
    const images = [
        'Images/img1.jpeg',
        'Images/img2.jpeg',
        'Images/img3.jpeg'
    ];
    const imgElement = document.getElementById('slideshow');
    let index = 0;
    let intervalId;

    const preloaded = images.map(src => {
        const i = new Image();
        i.src = src;
        return i;
    });

    function changeImage() {
        imgElement.classList.remove('fade-in');
        setTimeout(() => {
            imgElement.src = images[index];
            imgElement.alt = `Foto do casal (${index + 1})`;
            imgElement.classList.add('fade-in');
            index = (index + 1) % images.length;
        }, 150);
    }

    function start() {
        if (!intervalId) {
            changeImage();
            intervalId = setInterval(changeImage, 5000);
        }
    }
    function stop() {
        clearInterval(intervalId);
        intervalId = null;
    }
    document.addEventListener('visibilitychange', () => {
        document.hidden ? stop() : start();
    });
    imgElement.addEventListener('mouseenter', stop);
    imgElement.addEventListener('mouseleave', start);
    start();
}

// Modal acessível
function openModal(videoSrc) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    const wrapper = document.createElement('div');
    wrapper.className = 'modal-content relative';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'absolute top-4 right-4 text-white text-2xl';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Fechar vídeo');

    const video = document.createElement('video');
    video.controls = true;
    video.autoplay = true;
    video.style.maxWidth = '90vw';
    video.style.maxHeight = '80vh';

    const source = document.createElement('source');
    source.src = videoSrc;
    source.type = 'video/mp4';
    video.appendChild(source);

    wrapper.appendChild(closeBtn);
    wrapper.appendChild(video);
    modal.appendChild(wrapper);
    document.body.appendChild(modal);
    closeBtn.focus();

    function close() {
        modal.remove();
        document.removeEventListener('keydown', onKeyDown);
    }
    function onKeyDown(e) {
        if (e.key === 'Escape') close();
    }
    modal.addEventListener('click', e => {
        if (e.target === modal) close();
    });
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', onKeyDown);
}

// Botão de motivos
document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    startSlideshow();
    document.getElementById('motivoBtn').addEventListener('click', () => {
        const motivos = [
            "Porque você me faz sorrir todos os dias.",
            "Porque você é a pessoa mais especial da minha vida.",
            "Porque você me inspira a ser melhor.",
            "Porque você me entende como ninguém.",
            "Porque você ilumina meus dias com seu amor.",
            "Porque você é minha melhor companhia.",
            "Porque você me faz acreditar no amor verdadeiro.",
            "Porque você é única e incrível.",
            "Porque você me completa de todas as formas.",
            "Porque você é a razão da minha felicidade."
        ];
        alert(motivos[Math.floor(Math.random() * motivos.length)]);
    });
});
