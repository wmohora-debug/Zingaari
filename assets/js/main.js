/**
 * Zingaari Studio - Main Interactive JavaScript
 * High performance, zero-dependency, mobile-optimized accessible vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer & Backdrop
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  let backdrop = document.querySelector('.mobile-menu-backdrop');

  if (!backdrop && mobileMenu) {
    backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    document.body.appendChild(backdrop);
  }

  function toggleMenu(forceClose = false) {
    if (!mobileMenu || !mobileToggle) return;
    const shouldOpen = forceClose ? false : !mobileMenu.classList.contains('open');

    if (shouldOpen) {
      mobileMenu.classList.add('open');
      mobileToggle.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      if (backdrop) backdrop.classList.add('active');
      document.body.classList.add('menu-locked');
    } else {
      mobileMenu.classList.remove('open');
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      if (backdrop) backdrop.classList.remove('active');
      document.body.classList.remove('menu-locked');
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => toggleMenu(true));
  }

  // Close when clicking any link inside mobile menu
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(true));
    });
  }

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      toggleMenu(true);
    }
  });

  // 2. Header Scroll Effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 15) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 3. Gallery Filtering (on Dhaba Dash page)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Scroll the button into view on mobile chips bar
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 30);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 180);
          }
        });
      });
    });
  }

  // 4. Interactive Lightbox Modal with Mobile Arrows & Touch Swipe
  const lightbox = document.getElementById('screenshotLightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDesc = lightbox.querySelector('.lightbox-desc');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIdx = 0;
    const items = Array.from(document.querySelectorAll('.gallery-item[data-src]'));

    function openLightbox(index) {
      if (!items[index]) return;
      currentIdx = index;
      const item = items[index];
      const src = item.getAttribute('data-src');
      const title = item.getAttribute('data-title') || '';
      const desc = item.getAttribute('data-desc') || '';

      lightboxImg.src = src;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;

      lightbox.classList.add('active');
      document.body.classList.add('menu-locked');
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.classList.remove('menu-locked');
      setTimeout(() => {
        lightboxImg.src = '';
      }, 250);
    }

    function showNext() {
      if (!items.length) return;
      currentIdx = (currentIdx + 1) % items.length;
      openLightbox(currentIdx);
    }

    function showPrev() {
      if (!items.length) return;
      currentIdx = (currentIdx - 1 + items.length) % items.length;
      openLightbox(currentIdx);
    }

    items.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });

    // Touch Swipe Gestures for Mobile Lightbox
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 45;
      if (touchEndX < touchStartX - threshold) {
        showNext(); // Swiped left -> next image
      } else if (touchEndX > touchStartX + threshold) {
        showPrev(); // Swiped right -> prev image
      }
    }
  }

  // 5. Copy Email To Clipboard Helper
  window.copyEmail = function(emailStr, event) {
    if (event) event.preventDefault();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailStr).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Email: ' + emailStr);
      });
    } else {
      showToast('Email: ' + emailStr);
    }
  };

  function showToast(msg) {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> <span></span>`;
      document.body.appendChild(toast);
    }
    toast.querySelector('span').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
});
