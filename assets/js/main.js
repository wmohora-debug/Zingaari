/**
 * Zingaari Studio - Main Interactive JavaScript
 * High performance, zero-dependency, accessible vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close when clicking a link inside mobile menu
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      }
    });
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
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

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // 4. Interactive Lightbox Modal (for Screenshot Inspection)
  const lightbox = document.getElementById('screenshotLightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDesc = lightbox.querySelector('.lightbox-desc');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Collect all openable items
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
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        lightboxImg.src = '';
      }, 300);
    }

    items.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') {
        const nextIdx = (currentIdx + 1) % items.length;
        openLightbox(nextIdx);
      }
      if (e.key === 'ArrowLeft') {
        const prevIdx = (currentIdx - 1 + items.length) % items.length;
        openLightbox(prevIdx);
      }
    });
  }

  // 5. Copy Email To Clipboard Helper
  window.copyEmail = function(emailStr, event) {
    if (event) event.preventDefault();
    navigator.clipboard.writeText(emailStr).then(() => {
      showToast('Email address copied to clipboard!');
    }).catch(() => {
      // Fallback
      showToast('Contact us at: ' + emailStr);
    });
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
    }, 3200);
  }
});
