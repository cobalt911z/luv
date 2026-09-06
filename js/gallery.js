/* ==========================================================================
   PHOTO & VIDEO GALLERY MODULE
   Supports Masonry Filter, Lightbox Overlay, Touch Swipe, External Images,
   Videos, YouTube Links, and Google Drive Links (Auto-Converted)
   ========================================================================== */

(function () {
  'use strict';

  let galleryItems = [];
  let currentIndex = 0;

  // Google Drive URL Helper
  function processMediaUrl(url) {
    if (!url) return { isGoogleDrive: false, src: '' };

    const gdriveMatch = url.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|lh3\.googleusercontent\.com\/d\/)([a-zA-Z0-9_-]+)/i);
    if (gdriveMatch && gdriveMatch[1]) {
      const fileId = gdriveMatch[1];
      return {
        isGoogleDrive: true,
        fileId: fileId,
        imageSrc: `https://lh3.googleusercontent.com/d/${fileId}`,
        thumbnailSrc: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
        embedVideoSrc: `https://drive.google.com/file/d/${fileId}/preview`
      };
    }

    return { isGoogleDrive: false, src: url };
  }

  // Parse Video Source (MP4, YouTube, Google Drive Video)
  function parseVideoUrl(url) {
    if (!url) return null;

    const gdrive = processMediaUrl(url);
    if (gdrive.isGoogleDrive) {
      return {
        type: 'gdrive',
        embedSrc: gdrive.embedVideoSrc
      };
    }

    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      return {
        type: 'youtube',
        embedSrc: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1`
      };
    }

    if (url.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i)) {
      return { type: 'mp4', src: url };
    }

    return null;
  }

  function renderGalleryFromConfig() {
    const config = window.ANNIVERSARY_CONFIG || {};
    const items = config.gallery || [];
    const galleryGrid = document.getElementById('galleryGrid');

    if (!galleryGrid || !items.length) return;

    const currentLang = window.i18n ? window.i18n.getLang() : 'th';
    galleryGrid.innerHTML = '';
    galleryItems = [];

    items.forEach((item, index) => {
      const isVideo = item.type === 'video' || parseVideoUrl(item.src) !== null;
      let mediaSrc = item.src || '';
      let poster = item.poster || mediaSrc;

      // Handle Google Drive Images
      const gdrive = processMediaUrl(mediaSrc);
      if (gdrive.isGoogleDrive && !item.poster) {
        poster = gdrive.imageSrc;
        if (!isVideo) mediaSrc = gdrive.imageSrc;
      }

      const captionTh = item.captionTh || '';
      const captionEn = item.captionEn || '';
      const caption = currentLang === 'th' ? captionTh : captionEn;
      const category = item.category || 'date';

      const itemEl = document.createElement('div');
      itemEl.className = 'gallery-item glass-card';
      itemEl.setAttribute('data-category', category);
      itemEl.setAttribute('data-reveal', 'scale');

      itemEl.innerHTML = `
        <div class="img-wrapper" data-index="${index}">
          <img src="${poster}" alt="${escapeHTML(captionEn)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800'">
          ${isVideo ? '<span class="video-badge">🎥 วิดีโอ</span>' : ''}
          <div class="img-overlay">
            <span class="zoom-icon">${isVideo ? '▶️' : '🔍'}</span>
            <span class="img-caption" data-th="${escapeHTML(captionTh)}" data-en="${escapeHTML(captionEn)}">${escapeHTML(caption)}</span>
          </div>
        </div>
      `;

      galleryGrid.appendChild(itemEl);

      galleryItems.push({
        isVideo: isVideo,
        src: mediaSrc,
        poster: poster,
        captionTh: captionTh,
        captionEn: captionEn,
        caption: caption
      });
    });

    initLightboxTriggers();
  }

  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
      btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        const items = document.querySelectorAll('.gallery-item');

        items.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      };
    });
  }

  function initLightboxTriggers() {
    const lightbox = document.getElementById('lightbox');
    const lightboxContainer = document.querySelector('.lightbox-content');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    if (!lightbox) return;

    const wrappers = document.querySelectorAll('.gallery-item .img-wrapper');
    wrappers.forEach(wrapper => {
      wrapper.onclick = () => {
        const idx = parseInt(wrapper.getAttribute('data-index'), 10);
        openLightbox(idx);
      };
    });

    function openLightbox(index) {
      if (index < 0 || index >= galleryItems.length) return;
      currentIndex = index;
      const item = galleryItems[currentIndex];
      if (!item) return;

      const videoInfo = parseVideoUrl(item.src);
      const currentLang = window.i18n ? window.i18n.getLang() : 'th';
      const captionText = currentLang === 'th' ? (item.captionTh || item.caption) : (item.captionEn || item.caption);

      if (lightboxContainer) {
        if (item.isVideo || videoInfo) {
          if (videoInfo && (videoInfo.type === 'youtube' || videoInfo.type === 'gdrive')) {
            lightboxContainer.innerHTML = `
              <iframe 
                src="${videoInfo.embedSrc}" 
                width="100%" 
                height="480px" 
                frameborder="0" 
                allow="autoplay; fullscreen" 
                allowfullscreen
                style="max-width: 90vw; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.6);"
              ></iframe>
              <p id="lightboxCaption" class="lightbox-caption">${escapeHTML(captionText)}</p>
            `;
          } else {
            lightboxContainer.innerHTML = `
              <video 
                controls 
                autoplay 
                src="${item.src}" 
                poster="${item.poster}" 
                style="max-width: 90vw; max-height: 75vh; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.6);"
              ></video>
              <p id="lightboxCaption" class="lightbox-caption">${escapeHTML(captionText)}</p>
            `;
          }
        } else {
          lightboxContainer.innerHTML = `
            <img id="lightboxImg" src="${item.src}" alt="${escapeHTML(captionText)}">
            <p id="lightboxCaption" class="lightbox-caption">${escapeHTML(captionText)}</p>
          `;
        }
      }

      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      // Clear video playback on close
      if (lightboxContainer) {
        lightboxContainer.innerHTML = `
          <img id="lightboxImg" src="" alt="View Picture">
          <p id="lightboxCaption" class="lightbox-caption"></p>
        `;
      }
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      openLightbox(currentIndex);
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(currentIndex);
    }

    if (closeBtn) closeBtn.onclick = closeLightbox;
    if (nextBtn) nextBtn.onclick = showNext;
    if (prevBtn) prevBtn.onclick = showPrev;

    lightbox.onclick = (e) => {
      if (e.target === lightbox) closeLightbox();
    };

    document.onkeydown = (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderGalleryFromConfig();
    initFilters();
  });

  window.initLightbox = renderGalleryFromConfig;
})();
