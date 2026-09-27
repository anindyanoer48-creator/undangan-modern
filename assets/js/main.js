/**
 * Modern Minimalist Wedding Invitation - Main Script
 * Handles: Autoplay audio, Rundown Tabs, Gallery Lightbox, RSVP Guestbook, Countdown, Copy to Clipboard, Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const coverGate = document.getElementById('cover-gate');
  const btnOpen = document.getElementById('btn-open-invitation');
  const weddingAudio = document.getElementById('wedding-music');
  const audioWidget = document.getElementById('audio-widget');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioTooltip = document.getElementById('audio-tooltip');
  const guestNameEl = document.getElementById('guest-name');
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpNameInput = document.getElementById('rsvp-name');
  const wishesListEl = document.getElementById('wishes-list');
  const wishesCountEl = document.getElementById('wishes-count');
  const toastContainer = document.getElementById('toast-container');

  let isPlaying = false;

  // ==========================================================================
  // 1. URL Query Parameter Personalization (?to=Nama+Tamu)
  // ==========================================================================
  function getGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    const toParam = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest');
    if (toParam) {
      return decodeURIComponent(toParam.replace(/\+/g, ' ')).trim();
    }
    return 'Tamu Undangan';
  }

  const currentGuest = getGuestName();
  if (guestNameEl) {
    guestNameEl.textContent = currentGuest;
  }
  if (rsvpNameInput && currentGuest !== 'Tamu Undangan') {
    rsvpNameInput.value = currentGuest;
  }

  // ==========================================================================
  // 2. Audio Management (Payung Teduh - Akad)
  // ==========================================================================
  function updateAudioUI() {
    if (isPlaying) {
      audioWidget.classList.add('is-playing');
      audioToggleBtn.setAttribute('aria-label', 'Jeda Musik');
      audioTooltip.textContent = 'Payung Teduh - Akad';
    } else {
      audioWidget.classList.remove('is-playing');
      audioToggleBtn.setAttribute('aria-label', 'Putar Musik');
      audioTooltip.textContent = 'Putar Musik';
    }
  }

  function playAudio() {
    if (!weddingAudio) return;
    const playPromise = weddingAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
          updateAudioUI();
        })
        .catch((error) => {
          console.warn('Autoplay dengan audio dibatasi oleh kebijakan browser. Menunggu interaksi pengunjung:', error);
          isPlaying = false;
          updateAudioUI();
        });
    }
  }

  function pauseAudio() {
    if (!weddingAudio) return;
    weddingAudio.pause();
    isPlaying = false;
    updateAudioUI();
  }

  function toggleAudio() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', toggleAudio);
  }

  // Coba putar otomatis secara langsung saat halaman diakses
  playAudio();

  // Buka Undangan Action
  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      // 1. Putar lagu
      playAudio();
      
      // 2. Buka sampul
      coverGate.classList.add('hidden');
      document.body.classList.remove('locked');

      // 3. Scroll halus ke hero
      const hero = document.getElementById('hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Fallback klik di area cover
  coverGate.addEventListener('click', (e) => {
    if (e.target !== btnOpen && !btnOpen.contains(e.target)) {
      btnOpen.focus();
    }
  });

  // ==========================================================================
  // 3. Live Countdown Timer (Target: 24 Oktober 2026, 08:00 WIB)
  // ==========================================================================
  const weddingDate = new Date('2026-10-24T08:00:00+07:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (distance < 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================================================
  // 4. Susunan Acara (Rundown Tabs)
  // ==========================================================================
  const rundownTabBtns = document.querySelectorAll('.rundown-tab-btn');
  const rundownPanes = document.querySelectorAll('.rundown-content-pane');

  rundownTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      rundownTabBtns.forEach((b) => b.classList.remove('active'));
      rundownPanes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(targetTab);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 5. Dokumentasi (Gallery Lightbox Modal)
  // ==========================================================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryModal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-img');
      const captionText = item.getAttribute('data-caption') || 'Dokumentasi Pernikahan';

      if (modalImg && imgSrc) {
        modalImg.src = imgSrc;
        modalImg.alt = captionText;
      }
      if (modalCaption) {
        modalCaption.textContent = captionText;
      }
      if (galleryModal) {
        galleryModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeGalleryModal() {
    if (galleryModal) {
      galleryModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeGalleryModal);
  }

  if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) {
        closeGalleryModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryModal && galleryModal.classList.contains('show')) {
      closeGalleryModal();
    }
  });

  // ==========================================================================
  // 6. Toast Notification Utility
  // ==========================================================================
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A38350" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3200);
  }

  // ==========================================================================
  // 7. Copy to Clipboard (Nomor Rekening & Alamat)
  // ==========================================================================
  document.querySelectorAll('.btn-copy').forEach((button) => {
    button.addEventListener('click', () => {
      const copyTarget = button.getAttribute('data-copy');
      const label = button.getAttribute('data-label') || 'Teks';

      if (!copyTarget) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyTarget).then(() => {
          showToast(`${label} berhasil disalin ke clipboard`);
        }).catch(() => {
          fallbackCopyText(copyTarget, label);
        });
      } else {
        fallbackCopyText(copyTarget, label);
      }
    });
  });

  function fallbackCopyText(text, label) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`${label} berhasil disalin ke clipboard`);
    } catch (err) {
      showToast('Gagal menyalin teks secara otomatis');
    }
    document.body.removeChild(textArea);
  }

  // ==========================================================================
  // 8. RSVP & Live Guestbook (with localStorage)
  // ==========================================================================
  const STORAGE_KEY = 'wedding_wishes_raditya_amanda';

  const defaultWishes = [
    {
      name: 'Dimas Setiawan & Istri',
      status: 'hadir',
      guests: '2',
      message: 'Selamat untuk Raditya dan Amanda. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah serta senantiasa dilimpahkan kebahagiaan.',
      time: '1 jam yang lalu'
    },
    {
      name: 'Dr. Hendra Wijaya',
      status: 'hadir',
      guests: '2',
      message: 'Barakallahu lakum wa baraka alaikum. Selamat menempuh lembaran baru, lancar sampai hari H.',
      time: '3 jam yang lalu'
    },
    {
      name: 'Citra Anindita',
      status: 'ragu',
      guests: '1',
      message: 'Happy wedding Radit & Amanda! Doa terbaik selalu menyertai langkah kalian berdua.',
      time: 'Kemarin'
    }
  ];

  function getStoredWishes() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultWishes));
      return defaultWishes;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      return defaultWishes;
    }
  }

  function renderWishes() {
    if (!wishesListEl) return;
    const wishes = getStoredWishes();
    if (wishesCountEl) {
      wishesCountEl.textContent = `${wishes.length} Doa Restu`;
    }

    wishesListEl.innerHTML = '';

    wishes.forEach((item) => {
      const wishItem = document.createElement('div');
      wishItem.className = 'wish-item';

      let statusBadge = '';
      if (item.status === 'hadir') {
        statusBadge = `<span class="wish-status-badge status-hadir">Hadir (${item.guests || 1} orang)</span>`;
      } else if (item.status === 'tidak') {
        statusBadge = '<span class="wish-status-badge status-tidak">Berhalangan</span>';
      } else {
        statusBadge = '<span class="wish-status-badge status-ragu">Masih Ragu</span>';
      }

      wishItem.innerHTML = `
        <div class="wish-author-row">
          <span class="wish-author">${escapeHtml(item.name)}</span>
          ${statusBadge}
        </div>
        <p class="wish-text">${escapeHtml(item.message)}</p>
        <span class="wish-time">${escapeHtml(item.time || 'Baru saja')}</span>
      `;
      wishesListEl.appendChild(wishItem);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  renderWishes();

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('rsvp-name').value.trim();
      const status = document.getElementById('rsvp-status').value;
      const guests = document.getElementById('rsvp-guests').value;
      const message = document.getElementById('rsvp-message').value.trim();

      if (!name || !message) {
        showToast('Mohon lengkapi nama dan doa restu Anda.');
        return;
      }

      const newWish = {
        name,
        status,
        guests: status === 'hadir' ? guests : '0',
        message,
        time: 'Baru saja'
      };

      const wishes = getStoredWishes();
      wishes.unshift(newWish);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));

      renderWishes();
      showToast('Konfirmasi dan ucapan Anda berhasil dikirim. Terima kasih!');
      document.getElementById('rsvp-message').value = '';
    });
  }

  // ==========================================================================
  // 9. Active Navigation & Scroll Reveal
  // ==========================================================================
  const sections = document.querySelectorAll('section[id], header[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links a');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');

  function updateActiveNav() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    desktopNavLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    mobileNavLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Scroll reveal observer
  const revealElements = document.querySelectorAll('.fade-in-up');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appeared');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});
