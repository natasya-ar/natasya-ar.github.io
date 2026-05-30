/* ============================================================
   NATASYA AULIA RACHMA — PORTFOLIO JAVASCRIPT
   ============================================================ */

'use strict';

const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];


/* ══════════════════════════════════════════════════════════════
   1. LOADING SCREEN
══════════════════════════════════════════════════════════════ */
(function initLoading() {
    const screen = $('#loadingScreen');
    const bar = $('#loadingBar');
    if (!screen || !bar) return;

    let pct = 0;
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
        pct += Math.random() * 18;
        if (pct >= 100) {
            pct = 100;
            clearInterval(interval);
            bar.style.width = '100%';
            setTimeout(() => {
                screen.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 500);
        } else {
            bar.style.width = pct + '%';
        }
    }, 80);
})();


/* ══════════════════════════════════════════════════════════════
   2. CUSTOM CURSOR
══════════════════════════════════════════════════════════════ */
(function initCursor() {
    const dot = $('#cursorDot');
    const ring = $('#cursorRing');
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    (function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    })();

    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();


/* ══════════════════════════════════════════════════════════════
   3. TYPING ANIMATION
══════════════════════════════════════════════════════════════ */
(function initTyping() {
    const el = $('#typingText');
    if (!el) return;

    const phrases = [
        'Engineering Student',
        'Creative Learner',
        'Future Environmentalist',
        'Waste Treatment Enthusiast',
    ];

    let phraseIdx = 0, charIdx = 0, deleting = false, paused = false;

    function type() {
        const current = phrases[phraseIdx];

        if (paused) {
            paused = false;
            setTimeout(type, 1400);
            return;
        }

        if (!deleting) {
            el.textContent = current.slice(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) { deleting = true; paused = true; }
            setTimeout(type, 80);
        } else {
            el.textContent = current.slice(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
            setTimeout(type, 45);
        }
    }

    setTimeout(type, 1800);
})();


/* ══════════════════════════════════════════════════════════════
   4. NAVBAR
══════════════════════════════════════════════════════════════ */
(function initNavbar() {
    const navbar = $('#navbar');
    const hamburger = $('#hamburger');
    const navLinks = $('#navLinks');
    const links = $$('.nav-link');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
        updateActiveLink();
    }, { passive: true });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    function updateActiveLink() {
        const scrollMid = window.scrollY + window.innerHeight / 2;
        $$('section[id]').forEach(section => {
            const top = section.offsetTop;
            const btm = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const link = $(`.nav-link[data-section="${id}"]`);
            if (!link) return;
            if (scrollMid >= top && scrollMid < btm) {
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }

    updateActiveLink();
})();


/* ══════════════════════════════════════════════════════════════
   5. SCROLL PROGRESS BAR
══════════════════════════════════════════════════════════════ */
(function initScrollProgress() {
    const bar = $('#scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = pct + '%';
    }, { passive: true });
})();


/* ══════════════════════════════════════════════════════════════
   6. BACK TO TOP
══════════════════════════════════════════════════════════════ */
(function initBackToTop() {
    const btn = $('#backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();


/* ══════════════════════════════════════════════════════════════
   7. FADE-IN SCROLL OBSERVER
══════════════════════════════════════════════════════════════ */
(function initFadeIn() {
    const observer = new IntersectionObserver(
        (entries) => entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        }),
        { threshold: 0.12 }
    );
    $$('.fade-in').forEach(el => observer.observe(el));
})();


/* ══════════════════════════════════════════════════════════════
   8. SKILL BAR ANIMATION
══════════════════════════════════════════════════════════════ */
(function initSkillBars() {
    const observer = new IntersectionObserver(
        (entries) => entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width') || '0';
                setTimeout(() => { fill.style.width = width + '%'; }, 200);
                observer.unobserve(fill);
            }
        }),
        { threshold: 0.3 }
    );
    $$('.skill-bar-fill').forEach(f => observer.observe(f));
})();


/* ══════════════════════════════════════════════════════════════
   9. PARALLAX HERO ORBS
══════════════════════════════════════════════════════════════ */
(function initParallax() {
    const orbs = $$('[data-parallax]');
    if (!orbs.length) return;
    window.addEventListener('mousemove', (e) => {
        const dx = e.clientX - window.innerWidth / 2;
        const dy = e.clientY - window.innerHeight / 2;
        orbs.forEach(orb => {
            const speed = parseFloat(orb.getAttribute('data-parallax')) || 0.05;
            orb.style.transform = `translate(${dx * speed}px, ${dy * speed}px)`;
        });
    });
})();


/* ══════════════════════════════════════════════════════════════
   10. DARK MODE TOGGLE
══════════════════════════════════════════════════════════════ */
(function initDarkMode() {
    const btn = $('#themeToggle');
    const icon = $('#themeIcon');
    const html = document.documentElement;
    if (!btn || !icon) return;

    const saved = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', saved);
    updateIcon(saved);

    btn.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateIcon(next);
    });

    function updateIcon(theme) {
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
})();


/* ══════════════════════════════════════════════════════════════
   11. FOOTER YEAR
══════════════════════════════════════════════════════════════ */
(function initFooterYear() {
    const el = $('#year');
    if (el) el.textContent = new Date().getFullYear();
})();


/* ══════════════════════════════════════════════════════════════
   12. SMOOTH SCROLL
══════════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
        });
    });
})();