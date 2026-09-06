/* ==========================================================================
   CONFIG RENDERER & DATA BINDING MODULE
   Reads from config.js and binds all custom content directly to the website DOM
   ========================================================================== */

(function () {
  'use strict';

  function getActiveConfig() {
    return window.ANNIVERSARY_CONFIG || {};
  }

  function applyConfigToDOM() {
    const cfg = getActiveConfig();
    if (!cfg || !cfg.coupleNames) return;

    // 1. Couple Names
    const coupleDisplays = document.querySelectorAll('#coupleNamesDisplay, #footerCoupleNames');
    coupleDisplays.forEach(el => {
      if (el) el.textContent = cfg.coupleNames;
    });

    // 2. Sender Name
    const senderDisplay = document.getElementById('senderNameDisplay');
    if (senderDisplay && cfg.senderName) {
      senderDisplay.textContent = cfg.senderName;
    }

    // 3. Hero Subtitle
    const heroSub = document.querySelector('.hero-subtitle');
    if (heroSub && (cfg.heroSubtitleTh || cfg.heroSubtitleEn)) {
      heroSub.setAttribute('data-th', cfg.heroSubtitleTh);
      heroSub.setAttribute('data-en', cfg.heroSubtitleEn);
      const currentLang = window.i18n ? window.i18n.getLang() : 'th';
      heroSub.textContent = currentLang === 'th' ? cfg.heroSubtitleTh : cfg.heroSubtitleEn;
    }

    // 4. Love Letter Paragraphs
    const letterBox = document.getElementById('typewriterText');
    if (letterBox && cfg.letterTh && cfg.letterEn) {
      const currentLang = window.i18n ? window.i18n.getLang() : 'th';
      const paras = currentLang === 'th' ? cfg.letterTh : cfg.letterEn;
      letterBox.innerHTML = '';
      paras.forEach((pText, idx) => {
        const p = document.createElement('p');
        p.setAttribute('data-th', cfg.letterTh[idx] || pText);
        p.setAttribute('data-en', cfg.letterEn[idx] || pText);
        p.textContent = pText;
        letterBox.appendChild(p);
      });
    }

    // 5. Music Player Info
    if (cfg.music) {
      const songTitleEl = document.getElementById('songTitle');
      const songArtistEl = document.getElementById('songArtist');
      const audioEl = document.getElementById('bgAudio');
      if (songTitleEl && cfg.music.title) songTitleEl.textContent = cfg.music.title;
      if (songArtistEl && cfg.music.artist) songArtistEl.textContent = cfg.music.artist;
      if (audioEl && cfg.music.url) {
        audioEl.src = cfg.music.url;
      }
    }

    // 6. Love Story Timeline Rendering
    const timelineWrapper = document.getElementById('timelineWrapper');
    if (timelineWrapper && cfg.timeline && cfg.timeline.length) {
      const currentLang = window.i18n ? window.i18n.getLang() : 'th';
      timelineWrapper.innerHTML = '';
      cfg.timeline.forEach((item, index) => {
        const sideClass = index % 2 === 0 ? 'left' : 'right';
        const itemEl = document.createElement('div');
        itemEl.className = `timeline-item ${sideClass}`;
        itemEl.setAttribute('data-reveal', sideClass === 'left' ? 'fade-right' : 'fade-left');
        itemEl.innerHTML = `
          <div class="timeline-dot">${item.icon || '💖'}</div>
          <div class="timeline-content glass-card">
            <span class="timeline-date">${item.date}</span>
            <h3 data-th="${escapeHTML(item.titleTh)}" data-en="${escapeHTML(item.titleEn)}">${currentLang === 'th' ? item.titleTh : item.titleEn}</h3>
            <p data-th="${escapeHTML(item.descTh)}" data-en="${escapeHTML(item.descEn)}">${currentLang === 'th' ? item.descTh : item.descEn}</p>
          </div>
        `;
        timelineWrapper.appendChild(itemEl);
      });
    }

    // 7. Photo Gallery Rendering
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid && cfg.gallery && cfg.gallery.length) {
      const currentLang = window.i18n ? window.i18n.getLang() : 'th';
      galleryGrid.innerHTML = '';
      cfg.gallery.forEach((item) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'gallery-item glass-card';
        itemEl.setAttribute('data-category', item.category || 'date');
        itemEl.setAttribute('data-reveal', 'scale');
        itemEl.innerHTML = `
          <div class="img-wrapper">
            <img src="${escapeHTML(item.src)}" alt="${escapeHTML(item.captionEn)}" loading="lazy">
            <div class="img-overlay">
              <span class="zoom-icon">🔍</span>
              <span class="img-caption" data-th="${escapeHTML(item.captionTh)}" data-en="${escapeHTML(item.captionEn)}">${currentLang === 'th' ? item.captionTh : item.captionEn}</span>
            </div>
          </div>
        `;
        galleryGrid.appendChild(itemEl);
      });
    }

    // Update Timer
    if (window.timer && typeof window.timer.update === 'function') {
      window.timer.update();
    }
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyConfigToDOM();
  });

  window.configSystem = {
    getConfig: getActiveConfig,
    applyConfig: applyConfigToDOM
  };
})();
