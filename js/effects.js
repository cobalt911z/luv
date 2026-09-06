/* ==========================================================================
   VISUAL EFFECTS & ANIMATIONS MODULE (ENHANCED)
   Floating Hearts, Confetti, Scroll Reveal, Typewriter,
   Twinkling Stars, Sakura Petals, Heart Click Trail
   ========================================================================== */

(function () {
  'use strict';

  // 1. FLOATING HEARTS GENERATOR
  function initFloatingHearts(count = 18) {
    const container = document.getElementById('heartsContainer');
    if (!container) return;

    const heartSymbols = ['💕', '💖', '💗', '💘', '💝', '✨', '🌸', '🌹', '⭐', '🌷'];
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const heart = document.createElement('span');
      heart.className = 'heart';
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      
      const leftPos = Math.random() * 100;
      const duration = 7 + Math.random() * 9;
      const delay = Math.random() * 12;
      const size = 0.7 + Math.random() * 1.4;

      heart.style.left = `${leftPos}%`;
      heart.style.setProperty('--duration', `${duration}s`);
      heart.style.setProperty('--delay', `${delay}s`);
      heart.style.fontSize = `${size}rem`;
      heart.style.opacity = '0';

      container.appendChild(heart);
    }
  }

  // 2. TWINKLING STARS BACKGROUND
  function initTwinklingStars() {
    const starsBg = document.getElementById('starsBg');
    if (!starsBg) return;

    const count = window.innerWidth > 768 ? 50 : 25;
    const colors = ['#FF69B4', '#FFB6C1', '#E6E6FA', '#B0E0E6', '#FFDAB9', '#D8BFD8', '#FFD700'];

    starsBg.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star-dot';
      const size = 2 + Math.random() * 4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      star.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        --dur: ${2 + Math.random() * 4}s;
        --del: ${Math.random() * 5}s;
      `;
      starsBg.appendChild(star);
    }
  }

  // 3. SAKURA PETALS GENERATOR
  function initSakuraPetals(count = 12) {
    const container = document.getElementById('heartsContainer');
    if (!container) return;

    const petalColors = [
      ['#FFB6C1', '#FF69B4'],
      ['#FFD7E8', '#FFB6C1'],
      ['#FFC0CB', '#FF69B4'],
      ['#E6E6FA', '#D8BFD8'],
    ];

    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';
      const [c1, c2] = petalColors[Math.floor(Math.random() * petalColors.length)];
      const size = 8 + Math.random() * 10;
      const drift = (Math.random() - 0.5) * 100;
      const drift2 = (Math.random() - 0.5) * 80;
      petal.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle at 30% 30%, ${c1}, ${c2});
        --fall-dur: ${8 + Math.random() * 10}s;
        --fall-del: ${Math.random() * 12}s;
        --drift: ${drift}px;
        --drift2: ${drift2}px;
        border-radius: 50% 0 50% 0;
      `;
      container.appendChild(petal);
    }
  }

  // 4. CONFETTI LAUNCHER
  function launchConfetti(duration = 3500) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;z-index:999999;pointer-events:none;width:100vw;height:100vh';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const shapes = ['rect', 'circle', 'heart'];
    const colors = ['#FF69B4', '#FFD700', '#FF6B6B', '#E6E6FA', '#87CEEB', '#FF1493', '#FFF0F5', '#FFDAB9', '#B0E0E6'];

    const particles = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: -20,
      w: 6 + Math.random() * 10,
      h: 5 + Math.random() * 6,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 10,
      vy: 2 + Math.random() * 5,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 14,
      opacity: 1
    }));

    const startTime = Date.now();

    function drawHeart(ctx, x, y, size) {
      ctx.beginPath();
      ctx.moveTo(x, y + size * 0.3);
      ctx.bezierCurveTo(x, y, x - size * 0.5, y, x - size * 0.5, y + size * 0.3);
      ctx.bezierCurveTo(x - size * 0.5, y + size * 0.6, x, y + size * 0.9, x, y + size);
      ctx.bezierCurveTo(x, y + size * 0.9, x + size * 0.5, y + size * 0.6, x + size * 0.5, y + size * 0.3);
      ctx.bezierCurveTo(x + size * 0.5, y, x, y, x, y + size * 0.3);
      ctx.fill();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = Date.now() - startTime;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07;
        p.rotation += p.rotSpeed;
        if (elapsed > duration * 0.7) p.opacity -= 0.018;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'heart') {
          ctx.scale(0.5, 0.5);
          drawHeart(ctx, 0, -p.h, p.w);
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }

        ctx.restore();
      });

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }

    requestAnimationFrame(animate);
  }

  // 5. SCROLL REVEAL (Intersection Observer)
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  // 6. SURPRISE BUTTON LISTENER
  function initSurpriseButton() {
    const btn = document.getElementById('surpriseBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        launchConfetti(5000);
        initFloatingHearts(35);
        initSakuraPetals(20);
      });
    }
  }

  // 7. HEART CLICK TRAIL (click anywhere to spawn heart)
  function initHeartClickTrail() {
    const emojis = ['💕', '💖', '🌸', '✨', '💗'];
    document.addEventListener('click', (e) => {
      // Don't trigger on interactive elements
      if (e.target.closest('button, a, input, textarea, select')) return;

      const trail = document.createElement('span');
      trail.className = 'heart-trail';
      trail.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      trail.style.cssText = `
        left: ${e.clientX - 12}px;
        top: ${e.clientY - 12}px;
      `;
      document.body.appendChild(trail);
      setTimeout(() => trail.remove(), 900);
    });
  }

  // 8. SMOOTH CARD SHINE EFFECT (on gallery items hover)
  function initCardShine() {
    document.querySelectorAll('.glass-card').forEach(card => {
      card.classList.add('card-shine');
    });
  }

  // 9. TIMER NUMBER ANIMATION (count up with digit spin)
  function initTimerAnimation() {
    const timerBoxes = document.querySelectorAll('.timer-box');
    timerBoxes.forEach(box => {
      box.addEventListener('mouseenter', () => {
        box.style.transform = 'translateY(-8px) scale(1.05)';
        box.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
      });
      box.addEventListener('mouseleave', () => {
        box.style.transform = '';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initFloatingHearts(22);
    initTwinklingStars();
    initSakuraPetals(15);
    initScrollReveal();
    initSurpriseButton();
    initHeartClickTrail();
    initCardShine();
    initTimerAnimation();

    // Initial festive welcome confetti after page loads
    setTimeout(() => {
      launchConfetti(3000);
    }, 1400);
  });

  // Export for use in main.js
  window.effects = {
    launchConfetti,
    refreshHearts: initFloatingHearts,
    launchSakura: initSakuraPetals
  };
})();
