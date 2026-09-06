/* ==========================================================================
   PASSCODE PROTECTION MODULE
   Handles security lock screen, passcode verification, hints, and unlock events
   ========================================================================== */

(function () {
  'use strict';

  function initPasscodeProtection() {
    const config = window.ANNIVERSARY_CONFIG || {};
    const security = config.security || {};

    const passcodeScreen = document.getElementById('passcodeScreen');
    const passcodeForm = document.getElementById('passcodeForm');
    const passcodeInput = document.getElementById('passcodeInput');
    const passcodeError = document.getElementById('passcodeError');
    const toggleHintBtn = document.getElementById('toggleHintBtn');
    const passcodeHintText = document.getElementById('passcodeHintText');

    if (!passcodeScreen) return;

    // Check if security is enabled and not already unlocked in this session
    const isUnlocked = sessionStorage.getItem('anniversary_passcode_unlocked') === 'true';

    if (!security.enabled || isUnlocked) {
      passcodeScreen.classList.add('hidden');
      passcodeScreen.style.setProperty('display', 'none', 'important');
      passcodeScreen.style.pointerEvents = 'none';
      document.body.style.overflow = '';
      return;
    }

    // Show passcode lock screen
    passcodeScreen.classList.remove('hidden');
    passcodeScreen.style.setProperty('display', 'flex', 'important');
    passcodeScreen.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';

    // Populate hint text if available
    if (passcodeHintText) {
      const currentLang = window.i18n ? window.i18n.getLang() : 'th';
      const hint = currentLang === 'th' ? (security.hintTh || security.hintEn) : (security.hintEn || security.hintTh);
      passcodeHintText.textContent = hint || 'รหัสผ่านที่คุณกำหนดไว้ใน config.js';
    }

    // Toggle Hint Button
    if (toggleHintBtn && passcodeHintText) {
      toggleHintBtn.addEventListener('click', () => {
        passcodeHintText.classList.toggle('hidden');
      });
    }

    // Passcode Form Submit Handler
    if (passcodeForm && passcodeInput) {
      passcodeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputVal = passcodeInput.value.trim();
        const correctVal = String(security.password || '1234').trim();

        if (inputVal === correctVal) {
          // Success! Unlock screen
          sessionStorage.setItem('anniversary_passcode_unlocked', 'true');
          
          if (passcodeError) passcodeError.classList.add('hidden');
          
          // Trigger confetti
          if (window.effects && window.effects.launchConfetti) {
            window.effects.launchConfetti(4000);
          }

          // Fade out lock screen
          passcodeScreen.classList.add('fade-out');
          passcodeScreen.style.pointerEvents = 'none';
          
          setTimeout(() => {
            passcodeScreen.classList.add('hidden');
            passcodeScreen.style.setProperty('display', 'none', 'important');
            document.body.style.overflow = '';
          }, 500);

        } else {
          // Incorrect Password
          if (passcodeError) passcodeError.classList.remove('hidden');
          
          // Shake card animation
          const card = passcodeScreen.querySelector('.passcode-card');
          if (card) {
            card.classList.add('shake-error');
            setTimeout(() => card.classList.remove('shake-error'), 600);
          }

          passcodeInput.value = '';
          passcodeInput.focus();
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Delay slightly to allow loading screen to finish or align smoothly
    setTimeout(initPasscodeProtection, 300);
  });

  window.passcodeSystem = {
    init: initPasscodeProtection
  };
})();
