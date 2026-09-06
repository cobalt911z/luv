---
name: countdown-timer
description: Build beautiful countdown and count-up timers for anniversary websites. Includes days-together counters, next-anniversary countdowns, and real-time updating displays with elegant styling.
---

# Countdown Timer Skill

## Overview

Create real-time countdown and count-up timers perfect for anniversary websites. All implementations use vanilla JavaScript with no dependencies.

## Count-Up Timer (Days Together)

### JavaScript Implementation

```javascript
function initCountUp(startDateStr) {
  const startDate = new Date(startDateStr);

  function update() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;

    document.getElementById('timer-years').textContent = years;
    document.getElementById('timer-months').textContent = months;
    document.getElementById('timer-days').textContent = remainingDays;
    document.getElementById('timer-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('timer-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('timer-seconds').textContent = String(seconds).padStart(2, '0');
    document.getElementById('timer-total-days').textContent = days.toLocaleString();
  }

  update();
  setInterval(update, 1000);
}
```

### HTML Structure

```html
<div class="timer-container">
  <h2 class="timer-title">เราอยู่ด้วยกันมาแล้ว</h2>
  <div class="timer-grid">
    <div class="timer-unit">
      <span class="timer-value" id="timer-years">0</span>
      <span class="timer-label">ปี / Years</span>
    </div>
    <div class="timer-unit">
      <span class="timer-value" id="timer-months">0</span>
      <span class="timer-label">เดือน / Months</span>
    </div>
    <div class="timer-unit">
      <span class="timer-value" id="timer-days">0</span>
      <span class="timer-label">วัน / Days</span>
    </div>
    <div class="timer-unit">
      <span class="timer-value" id="timer-hours">00</span>
      <span class="timer-label">ชั่วโมง / Hours</span>
    </div>
    <div class="timer-unit">
      <span class="timer-value" id="timer-minutes">00</span>
      <span class="timer-label">นาที / Minutes</span>
    </div>
    <div class="timer-unit">
      <span class="timer-value" id="timer-seconds">00</span>
      <span class="timer-label">วินาที / Seconds</span>
    </div>
  </div>
  <p class="timer-total">รวมทั้งหมด <span id="timer-total-days">0</span> วัน</p>
</div>
```

### CSS Styling

```css
.timer-container {
  text-align: center;
  padding: 3rem 1.5rem;
}

.timer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  max-width: 700px;
  margin: 2rem auto;
}

.timer-unit {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(255, 105, 180, 0.1);
  transition: transform 0.3s ease;
}

.timer-unit:hover {
  transform: translateY(-5px);
}

.timer-value {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--pink-deep, #FF1493);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.timer-label {
  display: block;
  font-family: 'Quicksand', sans-serif;
  font-size: 0.85rem;
  color: var(--text-soft, #6B4C6E);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Flip animation on value change */
.timer-value.flip {
  animation: flipDigit 0.5s ease;
}

@keyframes flipDigit {
  0% { transform: rotateX(0); }
  50% { transform: rotateX(90deg); opacity: 0.5; }
  100% { transform: rotateX(0); }
}
```

## Countdown Timer (To Next Anniversary)

### Auto-detect Next Anniversary

```javascript
function getNextAnniversary(startDateStr) {
  const startDate = new Date(startDateStr);
  const now = new Date();
  let nextAnn = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());
  if (nextAnn <= now) {
    nextAnn.setFullYear(nextAnn.getFullYear() + 1);
  }
  return nextAnn;
}

function initCountdown(targetDate) {
  function update() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      // Anniversary is today! 🎉
      document.getElementById('countdown').innerHTML =
        '<h2 class="love-quote">🎉 Happy Anniversary! 🎉</h2>';
      launchConfetti();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = days;
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}
```

## User Configurable Date

Allow users to set their anniversary date via URL parameter or config:

```javascript
// Read from URL: ?date=2024-01-15
const params = new URLSearchParams(window.location.search);
const dateParam = params.get('date');
const anniversaryDate = dateParam || '2024-01-15'; // fallback default
```

## Milestone Messages

```javascript
const milestones = [
  { days: 100, msg: '100 วันแห่งความรัก 💕' },
  { days: 365, msg: 'ครบ 1 ปีแล้ว! 🎂' },
  { days: 500, msg: '500 วันมหัศจรรย์ ✨' },
  { days: 730, msg: '2 ปีแห่งความสุข 🌟' },
  { days: 1000, msg: '1,000 วันร่วมกัน 🏆' },
  { days: 1095, msg: '3 ปีแห่งความทรงจำ 💎' },
];

function checkMilestone(totalDays) {
  return milestones.find(m => m.days === totalDays);
}
```
