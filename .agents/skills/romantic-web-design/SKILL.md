---
name: romantic-web-design
description: Design romantic and anniversary-themed websites with premium aesthetics. Includes curated color palettes, typography, layout patterns, and emotional design principles for love-themed web experiences.
---

# Romantic Web Design Skill

## Overview
This skill guides the creation of visually stunning romantic/anniversary websites that evoke emotion and create memorable digital experiences.

## Color Palettes

### Pink & Pastel Playful (Primary Theme)
```css
:root {
  /* Primary Pinks */
  --pink-soft: #FFB6C1;
  --pink-blush: #FF69B4;
  --pink-deep: #FF1493;
  --pink-light: #FFF0F5;

  /* Pastel Accents */
  --pastel-lavender: #E6E6FA;
  --pastel-mint: #C1F0C1;
  --pastel-peach: #FFDAB9;
  --pastel-sky: #B0E0E6;
  --pastel-lemon: #FFFACD;

  /* Gold Accents */
  --gold: #D4AF37;
  --gold-light: #F5E6CC;
  --gold-shimmer: #FFD700;

  /* Neutrals */
  --cream: #FFF8F0;
  --white-warm: #FFFAF5;
  --text-dark: #2D1B2E;
  --text-soft: #6B4C6E;
  --text-muted: #9B7B9E;

  /* Gradients */
  --gradient-romantic: linear-gradient(135deg, #FFB6C1 0%, #FF69B4 50%, #E6E6FA 100%);
  --gradient-sunset: linear-gradient(135deg, #FF6B6B 0%, #FF69B4 50%, #FFDAB9 100%);
  --gradient-dreamy: linear-gradient(135deg, #E6E6FA 0%, #FFB6C1 50%, #FFFACD 100%);
  --gradient-pastel: linear-gradient(135deg, #FFF0F5 0%, #E6E6FA 50%, #B0E0E6 100%);
}
```

### Dark Romantic Variant
```css
[data-theme="dark"] {
  --bg-primary: #1A0A1E;
  --bg-secondary: #2D1B30;
  --bg-card: #3A2040;
  --text-primary: #FFE4E1;
  --text-secondary: #FFB6C1;
  --accent: #FF69B4;
}
```

## Typography

### Recommended Font Pairings
1. **Headers**: `'Playfair Display', serif` — Elegant, romantic serifs
2. **Body**: `'Quicksand', sans-serif` — Soft, rounded, friendly
3. **Accent/Quotes**: `'Dancing Script', cursive` — Handwritten feel for love notes
4. **Alternative Headers**: `'Cormorant Garamond', serif` — Classic elegance

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Quicksand:wght@300;400;500;600&family=Dancing+Script:wght@400;500;600;700&display=swap');
```

### Typography Scale
```css
.hero-title { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 700; }
.section-title { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 600; }
.body-text { font-size: clamp(1rem, 2vw, 1.2rem); line-height: 1.8; }
.love-quote { font-family: 'Dancing Script', cursive; font-size: clamp(1.5rem, 3vw, 2.5rem); }
```

## Layout Patterns

### Sections for Anniversary Website
1. **Hero Section** — Full-screen with couple photo/names, anniversary date, floating hearts
2. **Love Story Timeline** — Vertical scrolling timeline of relationship milestones
3. **Photo Gallery** — Masonry or carousel grid of couple photos
4. **Love Letter** — Styled letter/message section with handwriting font
5. **Countdown/Counter** — Days together counter or next anniversary countdown
6. **Music Player** — Embedded meaningful song
7. **Message/Guestbook** — Interactive reply section

### Design Elements
- **Floating particles**: Hearts, stars, petals
- **Parallax scrolling**: Depth effect on scroll
- **Glassmorphism cards**: Frosted glass effect on cards
- **Soft shadows**: Large, blurred, colored shadows
- **Border radius**: Generous rounded corners (16px-24px)
- **Hover effects**: Scale, glow, color shift on interactive elements

### Emotional Design Principles
1. **Warmth** — Use warm colors, soft gradients, generous whitespace
2. **Intimacy** — Close-up photos, personal messages, handwritten fonts
3. **Joy** — Playful animations, vibrant pastel colors, celebrations
4. **Nostalgia** — Timeline, memory photos, "remember when" moments
5. **Surprise** — Hidden interactions, scroll-triggered animations, confetti

## Responsive Design
- Mobile-first approach (most users will view on phone via shared link)
- Touch-friendly interactions
- Hamburger menu or single-page scroll navigation
- Images must be responsive with `object-fit: cover`
- Test on both portrait and landscape orientations
