/* ==========================================================================
   INTERNATIONALIZATION (i18n) MODULE
   Handles language toggling (Thai <-> English) and local storage preference
   ========================================================================== */

(function () {
  'use strict';

  let currentLang = localStorage.getItem('anniversary_lang') || 'th';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('anniversary_lang', lang);
    document.documentElement.setAttribute('lang', lang);

    // Update Language Toggle Button Label
    const langLabel = document.getElementById('langLabel');
    if (langLabel) {
      langLabel.textContent = lang === 'th' ? 'EN' : 'TH';
    }

    // Update all elements with data-th and data-en attributes
    const i18nElements = document.querySelectorAll('[data-th][data-en]');
    i18nElements.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          // If element has inner HTML formatting or child icons, update text carefully
          if (el.children.length === 0) {
            el.textContent = text;
          } else {
            // Find text nodes or replace primary content
            const spanText = el.querySelector('span[data-th]') || el;
            if (spanText !== el) {
              spanText.textContent = text;
            } else {
              // Update text while keeping child elements if needed
              const childIcon = el.querySelector('.sparkle, .heart-icon, .gift-icon');
              if (childIcon) {
                el.innerHTML = childIcon.outerHTML + ' ' + text;
              } else {
                el.textContent = text;
              }
            }
          }
        }
      }
    });

    // Fire custom event for other modules if needed
    window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
  }

  function toggleLanguage() {
    const nextLang = currentLang === 'th' ? 'en' : 'th';
    applyLanguage(nextLang);
  }

  // Initialize Language Switcher
  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLang);

    const langToggleBtn = document.getElementById('langToggleBtn');
    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', toggleLanguage);
    }
  });

  // Expose to global scope
  window.i18n = {
    getLang: () => currentLang,
    setLang: applyLanguage,
    toggle: toggleLanguage
  };
})();
