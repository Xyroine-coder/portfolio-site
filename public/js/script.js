const card = document.getElementById('portfolio-card');
const cursor = document.getElementById('custom-cursor');
const bibleBox = document.getElementById('bible-verse');

// Fade in Bible verse
window.addEventListener('load', () => {
    bibleBox.style.opacity = '1';
    cycleBibleBoxColor();
});

// Flip card on click
card.addEventListener('click', () => {
    card.classList.toggle('flip');
    animateSkills();
});

// Vanilla Tilt
VanillaTilt.init(card, {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    reverse: true
});

// Tilt effect from cursor anywhere
document.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    card.style.transform = `rotateY(${-x/20}deg) rotateX(${y/20}deg)`;

    // Move custom cursor
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});

// Typing effect
const typingElement = document.querySelector('.typing');
const text = typingElement.textContent;
typingElement.textContent = '';
let i = 0;
function typeWriter() {
    if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
    }
}
typeWriter();

// Particles
particlesJS.load('particles-js', '/particles.json', function() {
    console.log('Particles loaded.');
});

// Animate skills bars on flip
function animateSkills() {
    const fills = document.querySelectorAll('.fill');
    fills.forEach((fill) => {
        fill.style.width = fill.getAttribute('data-level') + '%';
    });
}

// Cycle Bible box background colors
function cycleBibleBoxColor() {
    const colors = ['rgba(0,0,0,0.8)', 'rgba(255,255,255,0.8)', 'rgba(100,100,100,0.8)', 'rgba(50,50,50,0.8)'];
    let index = 0;
    setInterval(() => {
        bibleBox.style.background = colors[index];
        index = (index + 1) % colors.length;
    }, 3000);
}
