/* ==========================================================================
   MAIN APPLICATION SCRIPT
   Navbar scroll, mobile menu, message form, guestbook storage, loading screen
   ========================================================================== */

(function () {
  'use strict';

  // 1. LOADING SCREEN REMOVAL
  function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');

    if (!loadingScreen) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      if (loadingProgress) loadingProgress.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loadingScreen.classList.add('fade-out');
        }, 300);
      }
    }, 150);
  }

  // 2. NAVBAR SCROLL & MOBILE MENU
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Navbar shadow on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });

    // Mobile menu toggle
    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('open');
      });

      // Close mobile menu when a nav link is clicked
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
        });
      });
    }
  }

  // 3. REPLY FORM & LOCAL STORAGE GUESTBOOK
  function initReplyForm() {
    const form = document.getElementById('replyForm');
    const feedbackBox = document.getElementById('sentFeedback');
    const sendAnotherBtn = document.getElementById('sendAnotherBtn');
    const messagesList = document.getElementById('messagesList');

    // Load saved messages from LocalStorage
    function loadSavedMessages() {
      if (!messagesList) return;
      const saved = JSON.parse(localStorage.getItem('anniversary_saved_messages') || '[]');
      
      messagesList.innerHTML = '';
      if (saved.length === 0) {
        const lang = window.i18n ? window.i18n.getLang() : 'th';
        const emptyMsg = lang === 'th' ? 'ยังไม่มีข้อความส่งเข้ามา เป็นคนแรกที่ส่งสิคะ/ครับ 💕' : 'No messages yet. Be the first one to send love 💕';
        messagesList.innerHTML = `<p class="text-muted text-center" style="text-align:center; color: var(--text-muted); padding: 1rem;">${emptyMsg}</p>`;
        return;
      }

      saved.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'msg-item glass-card';
        card.innerHTML = `
          <div class="msg-header">
            <span class="msg-sender">👤 ${escapeHTML(item.name)}</span>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="msg-reaction">${escapeHTML(item.reaction)}</span>
              <button class="delete-msg-btn" data-index="${index}" title="ลบข้อความนี้">🗑️</button>
            </div>
          </div>
          <p class="msg-body">${escapeHTML(item.message)}</p>
          <span style="display:block; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem; text-align: right;">${item.timestamp}</span>
        `;
        messagesList.appendChild(card);
      });

      // Attach Delete Click Handlers
      const deleteBtns = messagesList.querySelectorAll('.delete-msg-btn');
      deleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const indexToDelete = parseInt(btn.getAttribute('data-index'), 10);
          if (confirm('คุณต้องการลบข้อความนี้ใช่หรือไม่?')) {
            const currentSaved = JSON.parse(localStorage.getItem('anniversary_saved_messages') || '[]');
            currentSaved.splice(indexToDelete, 1);
            localStorage.setItem('anniversary_saved_messages', JSON.stringify(currentSaved));
            loadSavedMessages();
          }
        });
      });
    }

    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
      );
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('senderInputName');
        const reactionInput = document.querySelector('input[name="quickReaction"]:checked');
        const messageInput = document.getElementById('replyMessageText');

        if (!nameInput || !messageInput) return;

        const newEntry = {
          name: nameInput.value.trim(),
          reaction: reactionInput ? reactionInput.value : '💕',
          message: messageInput.value.trim(),
          timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Save to array
        const saved = JSON.parse(localStorage.getItem('anniversary_saved_messages') || '[]');
        saved.unshift(newEntry);
        localStorage.setItem('anniversary_saved_messages', JSON.stringify(saved));

        // Formspree / Email Service Integration
        const config = window.ANNIVERSARY_CONFIG || {};
        const replyCfg = config.replyService || {};
        if (replyCfg.enabled && replyCfg.formspreeUrl) {
          fetch(replyCfg.formspreeUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(newEntry)
          }).catch(err => console.warn('Formspree dispatch notice:', err));
        }

        // Setup LINE Share Button
        const lineShareBtn = document.getElementById('lineShareBtn');
        const lineShareBox = document.getElementById('lineShareBox');
        if (lineShareBtn && (replyCfg.lineShareEnabled !== false)) {
          const lineText = `💌 ข้อความตอบกลับวันครบรอบจาก ${newEntry.name}:\nความรู้สึก: ${newEntry.reaction}\nข้อความ: "${newEntry.message}"`;
          lineShareBtn.href = `https://line.me/R/msg/text/?${encodeURIComponent(lineText)}`;
          if (lineShareBox) lineShareBox.classList.remove('hidden');
        }

        // Trigger visual effect
        if (window.effects && window.effects.launchConfetti) {
          window.effects.launchConfetti(4000);
        }

        // Show feedback view
        form.classList.add('hidden');
        if (feedbackBox) feedbackBox.classList.remove('hidden');

        // Reload guestbook list
        loadSavedMessages();
      });
    }

    if (sendAnotherBtn) {
      sendAnotherBtn.addEventListener('click', () => {
        if (form) {
          form.reset();
          form.classList.remove('hidden');
        }
        if (feedbackBox) feedbackBox.classList.add('hidden');
      });
    }

    loadSavedMessages();
  }

  // 4. FOOTER & MISC INITIALIZATION
  function initFooter() {
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
      currentYearEl.textContent = new Date().getFullYear();
    }
  }

  // DOM Content Loaded Handler
  document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initNavbar();
    initReplyForm();
    initFooter();
  });
})();
