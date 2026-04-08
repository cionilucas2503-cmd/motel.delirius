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
        name: 'Suíte Sedução',
        desc: 'Deixe-se envolver pela atmosfera sensual da Suíte Sedução. Tons de roxo profundo, painel artístico exclusivo e iluminação LED criam o cenário perfeito para uma noite inesquecível.',
        price: 'A partir de R$ 250,00',
        details: ['Iluminação LED', 'Painel Artístico', 'Sofá Roxo', 'Espelho no Teto', 'Frigobar', 'Ar Condicionado'],
        images: ['Suite-1.png', 'Suite-1-1.png', 'Suite-1-2.png', 'Suite-1-3.png', 'Suite-1-4.png']
    },
    2: {
        name: 'Suíte Paixão',
        desc: 'A intensidade do vermelho toma conta de cada detalhe. Com espelho no teto, poltrona exclusiva e iluminação cênica, a Suíte Paixão é para quem quer viver momentos ardentes.',
        price: 'A partir de R$ 200,00',
        details: ['Espelho no Teto', 'Poltrona Exclusiva', 'Iluminação Vermelha', 'Frigobar', 'Ar Condicionado'],
        images: ['Suite-2-1.png', 'Suite-2-2.png', 'Suite-2-3.png', 'Suite-2-4.png', 'Suite-2-5.png']
    },
    3: {
        name: 'Suíte Desejo',
        desc: 'Design contemporâneo com parede marsala e iluminação LED geométrica. A Suíte Desejo combina elegância e conforto para quem busca uma experiência moderna e aconchegante.',
        price: 'A partir de R$ 180,00',
        details: ['Design Moderno', 'LED Geométrico', 'Parede Marsala', 'Mesa Refeição', 'Frigobar', 'Ar Condicionado'],
        images: ['Suite-3-1.png', 'Suite-3-2.png', 'Suite-3-3.png', 'Suite-3-4.png']
    },
    4: {
        name: 'Suíte Fascínio',
        desc: 'Iluminação neon roxa que pulsa no ambiente, TV de tela grande e poltrona tântrica. A Suíte Fascínio é o espaço ideal para quem quer se entregar ao prazer com estilo.',
        price: 'A partir de R$ 280,00',
        details: ['Neon Roxo', 'TV Tela Grande', 'Poltrona Tântrica', 'Mesa Bistro', 'Frigobar', 'Ar Condicionado'],
        images: ['Suite-4-1.png', 'Suite-4-2.png', 'Suite-4-3.png']
    },
    5: {
        name: 'Suíte Elegance',
        desc: 'Sofisticação em cada detalhe. Decoração em preto e dourado, escultura artística na parede e espelho geométrico no teto. A Suíte Elegance é a escolha de quem tem bom gosto.',
        price: 'A partir de R$ 300,00',
        details: ['Decoração Premium', 'Escultura Artística', 'Espelho Geométrico', 'Abajures', 'Frigobar', 'Ar Condicionado'],
        images: ['Suite-5-1.png', 'Suite-5-2.png', 'Suite-5-3.png']
    },
    6: {
        name: 'Suíte Oriental',
        desc: 'Uma experiência oriental única. Cama redonda com capitonê, teto espelhado circular e iluminação vermelha dramática. A Suíte Oriental é pura ousadia e exclusividade.',
        price: 'A partir de R$ 220,00',
        details: ['Cama Redonda', 'Teto Espelhado', 'Decoração Oriental', 'Iluminação Vermelha', 'Frigobar', 'Ar Condicionado'],
        images: ['Suite-6-1.png', 'Suite-6-2.png', 'Suite-6-3.png', 'Suite-6-4.png', 'Suite-6-5.png']
    },
    7: {
        name: 'Suíte Oceano',
        desc: 'Relaxe no azul sereno da Suíte Oceano. Com vista para o verde da natureza, teto espelhado e decoração em tons de azul e madeira, é o refúgio perfeito para momentos tranquilos.',
        price: 'A partir de R$ 150,00',
        details: ['Tema Oceano', 'Teto Espelhado', 'Vista Verde', 'Cama King', 'Frigobar', 'Ar Condicionado'],
        images: ['Suite-7-1.png', 'Suite-7-2.png', 'Suite-7-3.png', 'Suite-7-4.png', 'Suite-7-5.png']
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
        document.getElementById('modalPrice').textContent = suite.price;

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
