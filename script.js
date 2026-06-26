// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        faqItem.classList.toggle('active');
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) item.classList.remove('active');
        });
    });
});

// Scroll Reveal
const scrollElements = document.querySelectorAll(".reveal");
const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.15)) el.classList.add("appear");
    });
};
window.addEventListener("scroll", handleScrollAnimation);
handleScrollAnimation();

// ============================================
// GALLERY LIGHTBOX
// ============================================
const lightbox = document.getElementById('galleryLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const galleryItems = document.querySelectorAll('.gallery-item img');
let lightboxIndex = 0;
const gallerySrcs = Array.from(galleryItems).map(img => img.src);

galleryItems.forEach((img, i) => {
    img.addEventListener('click', () => {
        lightboxIndex = i;
        lightboxImg.src = gallerySrcs[lightboxIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelector('.lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    lightboxIndex = (lightboxIndex - 1 + gallerySrcs.length) % gallerySrcs.length;
    lightboxImg.src = gallerySrcs[lightboxIndex];
});

document.querySelector('.lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    lightboxIndex = (lightboxIndex + 1) % gallerySrcs.length;
    lightboxImg.src = gallerySrcs[lightboxIndex];
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { lightboxIndex = (lightboxIndex - 1 + gallerySrcs.length) % gallerySrcs.length; lightboxImg.src = gallerySrcs[lightboxIndex]; }
    if (e.key === 'ArrowRight') { lightboxIndex = (lightboxIndex + 1) % gallerySrcs.length; lightboxImg.src = gallerySrcs[lightboxIndex]; }
});

// ============================================
// SUITE MODAL & CAROUSEL
// ============================================
const suitesData = {
    1: {
        name: 'Suíte Paixão',
        desc: 'Suíte simples e aconchegante, perfeita para um encontro a dois cheio de intimidade. Ambiente confortável com tudo que você precisa para momentos especiais.',
        price: 'A partir de R$ 40,00',
        details: ['Suíte Simples', 'Sem Hidromassagem', 'TV', 'Frigobar', 'Ar Condicionado'],
        pricing: {
            weekday: [
                { time: '1 hora', value: '40,00' },
                { time: '2 horas', value: '55,00' },
                { time: '4 horas', value: '70,00' },
                { time: '12 horas (pernoite)', value: '85,00' }
            ],
            weekend: [
                { time: '1 hora', value: '40,00' },
                { time: '2 horas', value: '60,00' },
                { time: '4 horas', value: '75,00' },
                { time: '12 horas (pernoite)', value: '90,00' }
            ]
        },
        images: ['Suite-7-1.png', 'Suite-7-2.png', 'Suite-7-3.png', 'Suite-7-4.png', 'Suite-7-5.png']
    },
    2: {
        name: 'Suíte Delírios',
        desc: 'Suíte com hidromassagem em formato de coração para momentos relaxantes e sensuais. Conforto e charme para tornar sua estadia inesquecível.',
        price: 'A partir de R$ 80,00',
        details: ['Hidro Coração', 'Hidromassagem', 'TV', 'Frigobar', 'Ar Condicionado'],
        pricing: {
            weekday: [
                { time: '2 horas', value: '80,00' },
                { time: '4 horas', value: '100,00' },
                { time: '12 horas (pernoite)', value: '120,00' }
            ],
            weekend: [
                { time: '2 horas', value: '100,00' },
                { time: '4 horas', value: '110,00' },
                { time: '12 horas (pernoite)', value: '130,00' }
            ]
        },
        images: ['Suite-1.png', 'Suite-1-1.png', 'Suite-1-2.png', 'Suite-1-3.png', 'Suite-1-4.png']
    },
    3: {
        name: 'Suíte Amor',
        desc: 'Suíte predinho com hidromassagem, ampla e confortável para uma estadia inesquecível. Espaço privativo com toda a estrutura para o seu conforto.',
        price: 'A partir de R$ 80,00',
        details: ['Predinho', 'Hidromassagem', 'TV', 'Frigobar', 'Ar Condicionado'],
        pricing: {
            weekday: [
                { time: '2 horas', value: '80,00' },
                { time: '4 horas', value: '90,00' },
                { time: '12 horas (pernoite)', value: '100,00' }
            ],
            weekend: [
                { time: '2 horas', value: '90,00' },
                { time: '4 horas', value: '100,00' },
                { time: '12 horas (pernoite)', value: '110,00' }
            ]
        },
        images: ['Suite-6-1.png', 'Suite-6-2.png', 'Suite-6-3.png', 'Suite-6-4.png', 'Suite-6-5.png']
    },
    4: {
        name: 'Suíte Erótica',
        desc: 'Nossa suíte mais ousada, com pole dance (X) e hidromassagem em formato de coração para apimentar a noite. A escolha perfeita para quem busca emoção e prazer.',
        price: 'A partir de R$ 120,00',
        details: ['Pole Dance (X)', 'Hidro Coração', 'Hidromassagem', 'TV', 'Frigobar', 'Ar Condicionado'],
        pricing: {
            weekday: [
                { time: '4 horas', value: '120,00' },
                { time: '12 horas (pernoite)', value: '160,00' }
            ],
            weekend: [
                { time: '4 horas', value: '130,00' },
                { time: '12 horas (pernoite)', value: '170,00' }
            ]
        },
        images: ['Suite-2-1.png', 'Suite-2-2.png', 'Suite-2-3.png', 'Suite-2-4.png', 'Suite-2-5.png']
    }
};

const modal = document.getElementById('suiteModal');
const carouselContainer = document.getElementById('carouselImages');
const dotsContainer = document.getElementById('carouselDots');
let currentSlide = 0;
let totalSlides = 0;

// Open modal
document.querySelectorAll('.suite-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('.link-luxury')) e.preventDefault();
        const suiteId = card.dataset.suite;
        const suite = suitesData[suiteId];
        if (!suite) return;

        document.getElementById('modalTitle').textContent = suite.name;
        document.getElementById('modalDesc').textContent = suite.desc;

        const buildRows = (rows) => rows.map(r =>
            '<li><span class="pt-time">' + r.time + '</span><span class="pt-value">R$ ' + r.value + '</span></li>'
        ).join('');
        document.getElementById('modalPrice').innerHTML =
            '<div class="price-tables">' +
                '<div class="price-table">' +
                    '<h4>Segunda a Quinta</h4>' +
                    '<ul>' + buildRows(suite.pricing.weekday) + '</ul>' +
                '</div>' +
                '<div class="price-table price-table--weekend">' +
                    '<h4>Sexta a Domingo</h4>' +
                    '<ul>' + buildRows(suite.pricing.weekend) + '</ul>' +
                '</div>' +
            '</div>';

        const detailsEl = document.getElementById('modalDetails');
        detailsEl.innerHTML = suite.details.map(d => '<span class="modal-detail-item">' + d + '</span>').join('');

        carouselContainer.innerHTML = suite.images.map(img =>
            '<img src="assets/Motel Del\u00edrios/' + img + '" alt="' + suite.name + '">'
        ).join('');

        totalSlides = suite.images.length;
        currentSlide = 0;

        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        // Update WhatsApp link with custom message
        const whatsMsg = encodeURIComponent('Olá! Vim através do site e gostaria de reservar a *' + suite.name + '* (' + suite.price + '). Podem me passar as datas e horários disponíveis? Obrigado(a)!');
        document.querySelector('.modal-btn').href = 'https://wa.me/5511995942262?text=' + whatsMsg;

        updateCarousel();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Carousel controls
document.querySelector('.carousel-prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

document.querySelector('.carousel-next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    carouselContainer.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Keyboard & swipe
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') { currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; updateCarousel(); }
    if (e.key === 'ArrowRight') { currentSlide = (currentSlide + 1) % totalSlides; updateCarousel(); }
});

// Touch swipe
let touchStartX = 0;
let touchEndX = 0;

modal.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) { currentSlide = (currentSlide + 1) % totalSlides; }
        else { currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; }
        updateCarousel();
    }
});

// ============================================
// MÚSICA DE FUNDO
// ============================================
(function () {
    const audio = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggle');
    if (!audio || !btn) return;

    audio.volume = 0.35;
    let started = false;

    function setIcon(playing) {
        btn.classList.toggle('playing', playing);
        btn.innerHTML = playing
            ? '<i class="fas fa-volume-up"></i>'
            : '<i class="fas fa-volume-mute"></i>';
    }

    function autoStart() {
        if (started) return;
        audio.play().then(() => {
            started = true;
            setIcon(true);
            ['click', 'touchstart', 'scroll', 'keydown'].forEach(ev =>
                window.removeEventListener(ev, autoStart));
        }).catch(() => { /* navegador bloqueou: aguarda próxima interação */ });
    }

    // Tenta tocar já (alguns navegadores permitem); senão inicia na 1ª interação do usuário
    autoStart();
    ['click', 'touchstart', 'scroll', 'keydown'].forEach(ev =>
        window.addEventListener(ev, autoStart, { passive: true }));

    // Botão liga/desliga manual
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audio.paused) {
            audio.play();
            started = true;
            setIcon(true);
        } else {
            audio.pause();
            setIcon(false);
        }
    });
})();
