document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    const t = (key) => (window.I18n ? window.I18n.t(key) : undefined);
    const onLangChange = (fn) => document.addEventListener('langchange', fn);

    // --- Theme toggle (persisted, falls back silently if storage is blocked) ---
    const themeBtn = $('#theme-toggle');
    const themeColor = $('meta[name="theme-color"]');

    const applyTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        themeBtn.setAttribute('aria-label', t(theme === 'dark' ? 'theme.toLight' : 'theme.toDark') || 'Toggle theme');
        if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#0a0f1f' : '#f5f7fb');
    };

    applyTheme(root.getAttribute('data-theme') || 'dark');
    onLangChange(() => applyTheme(root.getAttribute('data-theme')));

    themeBtn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
    });

    // --- Navbar: scrolled state, progress bar, back-to-top ---
    const navbar = $('#navbar');
    const progress = $('.scroll-progress');
    const toTop = $('#to-top');
    let ticking = false;

    const onScroll = () => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        navbar.classList.toggle('is-scrolled', y > 12);
        progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
        toTop.classList.toggle('is-visible', y > 700);
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(onScroll);
        }
    }, { passive: true });
    onScroll();

    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    // --- Mobile menu ---
    const menuBtn = $('#menu-btn');
    const menu = $('#nav-menu');

    const setMenu = (open) => {
        menu.classList.toggle('is-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', t(open ? 'menu.close' : 'menu.open') || 'Menu');
        menuBtn.firstElementChild.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    };

    setMenu(false);
    onLangChange(() => setMenu(menu.classList.contains('is-open')));
    menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

    // --- Scroll spy ---
    const navLinks = $$('.nav-links a');
    const spyTargets = navLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);

    if ('IntersectionObserver' in window) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`));
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        spyTargets.forEach((el) => spy.observe(el));

        // --- Scroll reveal ---
        const reveal = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        $$('.reveal').forEach((el) => reveal.observe(el));

        // --- Count-up stats ---
        const counters = $$('[data-count]');
        const fmt = (el, n) => { el.textContent = `${n}${el.dataset.suffix || ''}`; };

        if (reduceMotion) {
            counters.forEach((el) => fmt(el, el.dataset.count));
        } else {
            counters.forEach((el) => fmt(el, 0));
            const countObs = new IntersectionObserver((entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    const target = Number(el.dataset.count);
                    const start = performance.now();
                    const duration = 1400;
                    const tick = (now) => {
                        const t = Math.min((now - start) / duration, 1);
                        fmt(el, Math.round(target * (1 - Math.pow(1 - t, 3))));
                        if (t < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                    // Safety net: always land on the real value, even if frames are throttled
                    setTimeout(() => fmt(el, target), duration + 150);
                    obs.unobserve(el);
                });
            }, { threshold: 0.6 });
            counters.forEach((el) => countObs.observe(el));
        }
    } else {
        $$('.reveal').forEach((el) => el.classList.add('is-visible'));
    }

    // --- Role rotator: typewriter in English, soft fade in Arabic (typing breaks Arabic letter joining) ---
    const rotator = $('#rotator');
    let rotatorRun = 0;

    const startRotator = () => {
        if (!rotator) return;
        const run = ++rotatorRun;
        const phrases = t('rotator') || [rotator.textContent];
        const arabic = root.getAttribute('lang') === 'ar';
        let p = 0;
        rotator.style.opacity = '1';
        rotator.textContent = phrases[0];
        if (reduceMotion) return;

        if (arabic) {
            const cycle = () => {
                if (run !== rotatorRun) return;
                rotator.style.opacity = '0';
                setTimeout(() => {
                    if (run !== rotatorRun) return;
                    p = (p + 1) % phrases.length;
                    rotator.textContent = phrases[p];
                    rotator.style.opacity = '1';
                    setTimeout(cycle, 2600);
                }, 350);
            };
            setTimeout(cycle, 2600);
            return;
        }

        let i = phrases[0].length, deleting = true;
        const step = () => {
            if (run !== rotatorRun) return;
            const word = phrases[p];
            i += deleting ? -1 : 1;
            rotator.textContent = word.slice(0, i);
            let delay = deleting ? 35 : 70;
            if (!deleting && i === word.length) { deleting = true; delay = 1800; }
            else if (deleting && i === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 350; }
            setTimeout(step, delay);
        };
        setTimeout(step, 2200);
    };

    startRotator();
    onLangChange(startRotator);

    // --- Cursor spotlight on cards ---
    $$('.spot').forEach((el) => el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
    }));

    // --- Download CV (print stylesheet → Save as PDF) ---
    // Also runs for Ctrl/Cmd+P: make sure nothing is mid-animation or hidden in the printout.
    window.addEventListener('beforeprint', () => {
        $$('.reveal').forEach((el) => el.classList.add('is-visible'));
        $$('[data-count]').forEach((el) => { el.textContent = `${el.dataset.count}${el.dataset.suffix || ''}`; });
    });
    $$('[data-print]').forEach((btn) => btn.addEventListener('click', () => window.print()));
});
