/**
 * EverAfter Studios — Main JavaScript
 * Handles: Theme, RTL, Active Nav, AOS, Lightbox, Portfolio Filter, Scroll Top
 */

(function () {
  'use strict';

  /* ─── Theme Toggle ─────────────────────────────────────────── */
  const THEME_KEY = 'ea_theme';
  const DIR_KEY   = 'ea_dir';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    document.querySelectorAll('.theme-icon').forEach(el => {
      el.className = el.className.replace(/bi-\S+|fa-\S+|ri-\S+/g, '');
      if (theme === 'dark') {
        el.classList.add('bi', 'bi-sun-fill');
      } else {
        el.classList.add('bi', 'bi-moon-stars-fill');
      }
    });
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  /* ─── RTL Toggle ───────────────────────────────────────────── */
  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(DIR_KEY, dir);
    document.querySelectorAll('.rtl-icon').forEach(el => {
      el.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    });
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR layout' : 'Switch to RTL layout');
    });
  }

  function toggleDir() {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    applyDir(current === 'rtl' ? 'ltr' : 'rtl');
  }

  /* ─── Active Nav Link ──────────────────────────────────────── */
  function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    
    // Clear all existing active classes from nav-links and dropdown-items
    document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .dropdown-item').forEach(el => {
      el.classList.remove('active');
    });

    // 1. Highlight dropdown items & parent toggle if active
    let foundDropdownItem = false;
    document.querySelectorAll('.navbar-nav .dropdown-item').forEach(item => {
      const href = item.getAttribute('href');
      if (href === path) {
        item.classList.add('active');
        foundDropdownItem = true;
        const parentToggle = item.closest('.dropdown').querySelector('.dropdown-toggle');
        if (parentToggle) {
          parentToggle.classList.add('active');
        }
      }
    });

    // 2. Highlight standard nav-links (excluding dropdown toggles if we highlighted a child)
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      if (link.classList.contains('dropdown-toggle') && foundDropdownItem) return;
      const page = link.getAttribute('data-page') || link.getAttribute('href');
      if (page === path) {
        link.classList.add('active');
      }
    });
  }

  /* ─── Navbar Scroll Shadow ─────────────────────────────────── */
  function initNavbarScroll() {
    const navbar = document.querySelector('.everafter-navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ─── Scroll To Top ────────────────────────────────────────── */
  function initScrollTop() {
    const btn = document.querySelector('.scroll-top-btn');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Portfolio Filter ─────────────────────────────────────── */
  function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items      = document.querySelectorAll('.gallery-item[data-cat]');
    if (!filterBtns.length || !items.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-filter');
        items.forEach(item => {
          if (cat === '*' || item.getAttribute('data-cat') === cat) {
            item.style.display = '';
            item.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ─── Lightbox ─────────────────────────────────────────────── */
  function initLightbox() {
    const overlay   = document.getElementById('lightbox-overlay');
    const imgEl     = document.getElementById('lightbox-img');
    const closeBtn  = document.getElementById('lightbox-close');
    const prevBtn   = document.getElementById('lightbox-prev');
    const nextBtn   = document.getElementById('lightbox-next');
    if (!overlay) return;

    let images = [];
    let currentIndex = 0;

    function openLightbox(src, idx, arr) {
      images = arr;
      currentIndex = idx;
      imgEl.src = src;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      imgEl.src = images[currentIndex];
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      imgEl.src = images[currentIndex];
    }

    // Attach to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item[data-src]');
    const srcs = Array.from(galleryItems).map(g => g.getAttribute('data-src'));

    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(srcs[i], i, srcs));
    });

    closeBtn && closeBtn.addEventListener('click', closeLightbox);
    prevBtn  && prevBtn.addEventListener('click', showPrev);
    nextBtn  && nextBtn.addEventListener('click', showNext);

    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', e => {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   showPrev();
      if (e.key === 'ArrowRight')  showNext();
    });
  }

  /* ─── AOS Init ─────────────────────────────────────────────── */
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 60,
        delay: 0
      });
    }
  }

  /* ─── Counter Animation ────────────────────────────────────── */
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;

    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const end   = parseInt(el.getAttribute('data-count'), 10);
        const dur   = 1800 + Math.min(end, 250);
        const suffix = el.getAttribute('data-suffix') || '';
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / dur, 1);
          const current = Math.round(end * easeOutCubic(progress));
          el.textContent = current + suffix;
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = end + suffix;
            el.classList.add('count-complete');
          }
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.4 });

    counters.forEach(c => observer.observe(c));
  }

  /* ─── Password Eye Toggle ──────────────────────────────────── */
  function initPasswordToggle() {
    document.querySelectorAll('.toggle-eye').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.closest('.password-toggle').querySelector('input');
        if (!input) return;
        const isPass = input.type === 'password';
        input.type = isPass ? 'text' : 'password';
        btn.className = btn.className.replace(/bi-eye\S*/g, '');
        btn.classList.add('bi', isPass ? 'bi-eye-slash' : 'bi-eye');
      });
    });
  }

  /* ─── Date Availability Form (demo) ───────────────────────── */
  function initForms() {
    document.querySelectorAll('form[data-demo]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        const orig = btn ? btn.textContent : '';
        if (btn) {
          btn.textContent = 'Sending...';
          btn.disabled = true;
        }
        setTimeout(() => {
          if (btn) {
            btn.textContent = 'Sent! We\'ll be in touch.';
            btn.style.background = 'linear-gradient(135deg, #4CAF50, #388E3C)';
          }
          setTimeout(() => {
            if (btn) {
              btn.textContent = orig;
              btn.style.background = '';
              btn.disabled = false;
            }
            form.reset();
          }, 3000);
        }, 1200);
      });
    });
  }

  /* ─── Auth Page Controls Scroll Hide ───────────────────────── */
  function initAuthScroll() {
    const controls = document.querySelector('.auth-controls');
    if (!controls) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        controls.classList.add('hidden');
      } else {
        controls.classList.remove('hidden');
      }
    }, { passive: true });
  }

  /* ─── Mobile Offcanvas Close on link click ─────────────────── */
  function initOffcanvasClose() {
    const offcanvas = document.getElementById('navbarOffcanvas');
    if (!offcanvas) return;
    offcanvas.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
      link.addEventListener('click', () => {
        if (link.classList.contains('dropdown-toggle')) return;
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
        if (bsOffcanvas) bsOffcanvas.hide();
      });
    });
  }

  /* ─── Navbar Home1/Home2 dropdown helper ──────────────────── */
  function initHomeDropdown() {
    // Handled natively by Bootstrap dropdown
  }

  /* ─── Init All ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    // Restore preferences
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    const savedDir   = localStorage.getItem(DIR_KEY)   || 'ltr';
    applyTheme(savedTheme);
    applyDir(savedDir);

    // Active nav
    setActiveNav();

    // Bind toggle buttons
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleDir);
    });

    // Components
    initNavbarScroll();
    initAuthScroll();
    initScrollTop();
    initPortfolioFilter();
    initLightbox();
    initAOS();
    animateCounters();
    initPasswordToggle();
    initForms();
    initOffcanvasClose();
    initHomeDropdown();
  });

})();
