---
name: animation-effects
description: Create stunning micro-animations and visual effects for romantic websites. Includes floating hearts, confetti, fireworks, parallax scrolling, scroll-triggered reveals, and particle systems using pure CSS and vanilla JavaScript.
---

# Animation Effects Skill

## Overview

Premium animation effects for romantic/anniversary websites. All implementations use pure CSS and vanilla JavaScript for GitHub Pages compatibility.

## Floating Hearts / Particles

### CSS-Only Floating Hearts

```css
.hearts-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.heart {
  position: absolute;
  bottom: -10%;
  font-size: 1.5rem;
  animation: floatUp var(--duration, 8s) var(--delay, 0s) infinite ease-in;
  opacity: 0;
}

@keyframes floatUp {
  0% {
    opacity: 0;
    transform: translateY(0) rotate(0deg) scale(0.5);
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    transform: translateY(-110vh) rotate(720deg) scale(1.2);
  }
}
```

### JavaScript Heart Generator

```javascript
function createFloatingHearts(container, count = 15) {
  const hearts = ['💕', '💖', '💗', '💘', '💝', '✨', '🌸'];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.setProperty('--duration', (6 + Math.random() * 8) + 's');
    heart.style.setProperty('--delay', (Math.random() * 10) + 's');
    heart.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
    container.appendChild(heart);
  }
}
```

## Confetti Effect

```javascript
function launchConfetti(duration = 3000) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#FF69B4', '#FFD700', '#FF6B6B', '#E6E6FA', '#87CEEB', '#FFB6C1'];
  const particles = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: -20,
    w: 6 + Math.random() * 6,
    h: 4 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 8,
    vy: 2 + Math.random() * 4,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 10,
    opacity: 1
  }));

  const start = Date.now();
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = Date.now() - start;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1; // gravity
      p.rotation += p.rotSpeed;
      if (elapsed > duration * 0.7) p.opacity -= 0.02;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (elapsed < duration) requestAnimationFrame(animate);
    else canvas.remove();
  }
  animate();
}
```

## Scroll-Triggered Reveal Animations

### Intersection Observer Setup

```javascript
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}
```

### CSS Reveal Classes

```css
[data-reveal] {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

[data-reveal="fade-up"] { transform: translateY(40px); }
[data-reveal="fade-left"] { transform: translateX(-40px); }
[data-reveal="fade-right"] { transform: translateX(40px); }
[data-reveal="scale"] { transform: scale(0.85); }
[data-reveal="rotate"] { transform: rotate(-5deg) scale(0.9); }

[data-reveal].revealed {
  opacity: 1;
  transform: none;
}
```

## Parallax Scrolling

```javascript
function initParallax() {
  const elements = document.querySelectorAll('[data-parallax]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + scrollY) * speed;
      el.style.transform = `translateY(${scrollY * speed - offset}px)`;
    });
  }, { passive: true });
}
```

## Smooth Page Transitions

```css
.page-enter {
  animation: pageEnter 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes pageEnter {
  from {
    opacity: 0;
    filter: blur(10px);
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: scale(1);
  }
}
```

## Typewriter Effect

```javascript
function typeWriter(element, text, speed = 50, callback) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}
```

## Performance Guidelines

1. Use `will-change` sparingly — only on actively animating elements
2. Prefer `transform` and `opacity` for animations (GPU-accelerated)
3. Use `requestAnimationFrame` for JS animations
4. Add `{ passive: true }` to scroll event listeners
5. Reduce particle count on mobile (`matchMedia('(max-width: 768px)')`)
6. Use `prefers-reduced-motion` media query for accessibility

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
