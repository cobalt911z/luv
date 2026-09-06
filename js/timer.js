/* ==========================================================================
   ANNIVERSARY COUNT-UP & COUNTDOWN TIMER MODULE
   ========================================================================== */

(function () {
  'use strict';

  function getAnniversaryStartDate() {
    if (window.configSystem && typeof window.configSystem.getConfig === 'function') {
      const cfg = window.configSystem.getConfig();
      if (cfg && cfg.startDate) {
        const d = new Date(cfg.startDate);
        if (!isNaN(d.getTime())) return d;
      }
    }
    const urlParams = new URLSearchParams(window.location.search);
    const startDateStr = urlParams.get('date') || '2024-01-15T00:00:00';
    return new Date(startDateStr);
  }

  function updateCountUpTimer() {
    const anniversaryStartDate = getAnniversaryStartDate();
    const now = new Date();
    const diff = now - anniversaryStartDate;

    if (diff < 0) {
      // Future date fallback display
      const elYears = document.getElementById('timerYears');
      const elMonths = document.getElementById('timerMonths');
      const elDays = document.getElementById('timerDays');
      if (elYears) elYears.textContent = 0;
      if (elMonths) elMonths.textContent = 0;
      if (elDays) elDays.textContent = 0;
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    // Precise Years, Months, Days breakdown
    let years = now.getFullYear() - anniversaryStartDate.getFullYear();
    let months = now.getMonth() - anniversaryStartDate.getMonth();
    let days = now.getDate() - anniversaryStartDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // DOM Updates
    const elYears = document.getElementById('timerYears');
    const elMonths = document.getElementById('timerMonths');
    const elDays = document.getElementById('timerDays');
    const elHours = document.getElementById('timerHours');
    const elMinutes = document.getElementById('timerMinutes');
    const elSeconds = document.getElementById('timerSeconds');
    const elTotalDays = document.getElementById('timerTotalDays');

    if (elYears) elYears.textContent = years;
    if (elMonths) elMonths.textContent = months;
    if (elDays) elDays.textContent = days;
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
    if (elTotalDays) elTotalDays.textContent = totalDays.toLocaleString();
  }

  function getNextAnniversaryDate() {
    const anniversaryStartDate = getAnniversaryStartDate();
    const now = new Date();
    let nextAnn = new Date(now.getFullYear(), anniversaryStartDate.getMonth(), anniversaryStartDate.getDate(), 0, 0, 0);
    if (nextAnn <= now) {
      nextAnn.setFullYear(nextAnn.getFullYear() + 1);
    }
    return nextAnn;
  }

  function updateCountdownTimer() {
    const nextAnnDate = getNextAnniversaryDate();
    const now = new Date();
    const diff = nextAnnDate - now;

    if (diff <= 0) {
      // Anniversary Today!
      if (window.effects && window.effects.launchConfetti) {
        window.effects.launchConfetti(5000);
      }
      return;
    }

    const cdDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const cdHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const cdMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const cdSeconds = Math.floor((diff % (1000 * 60)) / 1000);

    const elCdDays = document.getElementById('cdDays');
    const elCdHours = document.getElementById('cdHours');
    const elCdMinutes = document.getElementById('cdMinutes');
    const elCdSeconds = document.getElementById('cdSeconds');

    if (elCdDays) elCdDays.textContent = cdDays;
    if (elCdHours) elCdHours.textContent = String(cdHours).padStart(2, '0');
    if (elCdMinutes) elCdMinutes.textContent = String(cdMinutes).padStart(2, '0');
    if (elCdSeconds) elCdSeconds.textContent = String(cdSeconds).padStart(2, '0');
  }

  function updateAllTimers() {
    updateCountUpTimer();
    updateCountdownTimer();
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateAllTimers();
    setInterval(updateAllTimers, 1000);
  });

  window.timer = {
    getStartDate: getAnniversaryStartDate,
    getNextAnniversary: getNextAnniversaryDate,
    update: updateAllTimers
  };
})();
