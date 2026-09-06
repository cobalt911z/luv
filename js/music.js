/* ==========================================================================
   MUSIC PLAYER MODULE
   Supports MP3 Audio Files, YouTube Links, and Spotify Embedded Players
   ========================================================================== */

(function () {
  'use strict';

  function parseMusicUrl(url) {
    if (!url) return { type: 'mp3', src: '' };

    // YouTube Detection
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      return {
        type: 'youtube',
        id: ytMatch[1],
        embedSrc: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?enablejsapi=1&autoplay=0&loop=1&playlist=${ytMatch[1]}`
      };
    }

    // Spotify Detection
    const spotifyMatch = url.match(/open\.spotify\.com\/track\/([a-zA-Z0-9]+)/i);
    if (spotifyMatch && spotifyMatch[1]) {
      return {
        type: 'spotify',
        id: spotifyMatch[1],
        embedSrc: `https://open.spotify.com/embed/track/${spotifyMatch[1]}?utm_source=generator&theme=0`
      };
    }

    // Default MP3 Direct Link
    return { type: 'mp3', src: url };
  }

  function initMusicPlayer() {
    const config = window.ANNIVERSARY_CONFIG || {};
    const musicCfg = config.music || {};
    const url = musicCfg.url || '';
    const parsed = parseMusicUrl(url);

    const musicCard = document.querySelector('.music-player-card');
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    const audio = document.getElementById('bgAudio');
    const vinylDisc = document.getElementById('vinylDisc');

    if (songTitle && musicCfg.title) songTitle.textContent = musicCfg.title;
    if (songArtist && musicCfg.artist) songArtist.textContent = musicCfg.artist;

    if (parsed.type === 'youtube' || parsed.type === 'spotify') {
      // Replace audio controls with clean embedded player iframe
      if (musicCard) {
        let embedContainer = document.getElementById('embedMusicContainer');
        if (!embedContainer) {
          embedContainer = document.createElement('div');
          embedContainer.id = 'embedMusicContainer';
          embedContainer.className = 'embed-music-container';
          musicCard.appendChild(embedContainer);
        }

        const height = parsed.type === 'spotify' ? '152px' : '220px';
        embedContainer.innerHTML = `
          <iframe 
            src="${parsed.embedSrc}" 
            width="100%" 
            height="${height}" 
            frameborder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            style="border-radius: 16px; margin-top: 1rem; box-shadow: 0 8px 25px rgba(0,0,0,0.15);"
          ></iframe>
        `;
      }

      // Keep vinyl disc spinning as a visual accent
      if (vinylDisc) vinylDisc.classList.add('playing');

      // Hide simple audio controls if YouTube or Spotify is active
      const playerControls = document.querySelector('.player-controls');
      const progressArea = document.querySelector('.progress-area');
      if (playerControls) playerControls.style.display = 'none';
      if (progressArea) progressArea.style.display = 'none';

    } else if (parsed.type === 'mp3' && audio) {
      // Standard MP3 Player Setup
      audio.src = parsed.src;

      const playPauseBtn = document.getElementById('playPauseBtn');
      const musicQuickToggle = document.getElementById('musicQuickToggle');
      const progressBarBg = document.getElementById('progressBarBg');
      const progressBarFill = document.getElementById('progressBarFill');
      const currentTimeEl = document.getElementById('currentTime');
      const durationTimeEl = document.getElementById('durationTime');

      let isPlaying = false;

      function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }

      function togglePlay() {
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play().then(() => {
            isPlaying = true;
            updatePlayerUI();
          }).catch(err => {
            console.warn('Autoplay prevented:', err);
          });
        }
      }

      function updatePlayerUI() {
        if (isPlaying) {
          if (playPauseBtn) playPauseBtn.textContent = '⏸️';
          if (vinylDisc) vinylDisc.classList.add('playing');
          if (musicQuickToggle) musicQuickToggle.classList.add('active');
        } else {
          if (playPauseBtn) playPauseBtn.textContent = '▶️';
          if (vinylDisc) vinylDisc.classList.remove('playing');
          if (musicQuickToggle) musicQuickToggle.classList.remove('active');
        }
      }

      if (playPauseBtn) playPauseBtn.onclick = togglePlay;
      if (musicQuickToggle) musicQuickToggle.onclick = togglePlay;

      audio.onplay = () => { isPlaying = true; updatePlayerUI(); };
      audio.onpause = () => { isPlaying = false; updatePlayerUI(); };

      audio.ontimeupdate = () => {
        if (!isNaN(audio.duration) && audio.duration > 0) {
          const percent = (audio.currentTime / audio.duration) * 100;
          if (progressBarFill) progressBarFill.style.width = `${percent}%`;
          if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
          if (durationTimeEl) durationTimeEl.textContent = formatTime(audio.duration);
        }
      };

      if (progressBarBg) {
        progressBarBg.onclick = (e) => {
          const rect = progressBarBg.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const seekPercent = clickX / rect.width;
          if (!isNaN(audio.duration)) {
            audio.currentTime = seekPercent * audio.duration;
          }
        };
      }
    }
  }

  document.addEventListener('DOMContentLoaded', initMusicPlayer);

  window.musicPlayer = {
    init: initMusicPlayer
  };
})();
