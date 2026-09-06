---
name: image-gallery
description: Build responsive image galleries with lightbox overlays, carousels, masonry layouts, and lazy loading. Pure HTML/CSS/JS without external dependencies for GitHub Pages compatibility.
---

# Image Gallery Skill

## Overview
Create beautiful, responsive image galleries using vanilla HTML/CSS/JS that work perfectly on GitHub Pages (no server-side processing needed).

## Gallery Types

### 1. Masonry Grid Gallery
Best for displaying photos of varying aspect ratios in a Pinterest-like layout.

```css
.gallery-masonry {
  columns: 3;
  column-gap: 16px;
  padding: 16px;
}

.gallery-masonry .gallery-item {
  break-inside: avoid;
  margin-bottom: 16px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-masonry .gallery-item:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 32px rgba(255, 105, 180, 0.3);
}

.gallery-masonry .gallery-item img {
  width: 100%;
  display: block;
  transition: filter 0.3s ease;
}

@media (max-width: 768px) {
  .gallery-masonry { columns: 2; }
}

@media (max-width: 480px) {
  .gallery-masonry { columns: 1; }
}
```

### 2. Carousel/Slider
Best for featured photos or storytelling sequences.

```html
<div class="carousel" id="photoCarousel">
  <div class="carousel-track">
    <div class="carousel-slide active">
      <img src="./assets/images/photo1.jpg" alt="Our first date" loading="lazy">
      <p class="slide-caption">Our first date — January 2024</p>
    </div>
    <!-- More slides -->
  </div>
  <button class="carousel-btn prev" aria-label="Previous">❮</button>
  <button class="carousel-btn next" aria-label="Next">❯</button>
  <div class="carousel-dots"></div>
</div>
```

### 3. Lightbox Overlay
Full-screen image viewing with navigation.

```css
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(10px);
}

.lightbox.active {
  opacity: 1;
  pointer-events: all;
}

.lightbox img {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}
```

## Image Optimization for GitHub Pages
1. **Use WebP format** when possible (fallback to JPEG)
2. **Compress images** — aim for < 200KB per image
3. **Responsive images** with `srcset` for different screen sizes
4. **Lazy loading** — add `loading="lazy"` to all images below the fold
5. **Placeholder/blur-up** — use tiny base64 placeholder while loading

```html
<img
  src="./assets/images/photo-800.jpg"
  srcset="
    ./assets/images/photo-400.jpg 400w,
    ./assets/images/photo-800.jpg 800w,
    ./assets/images/photo-1200.jpg 1200w
  "
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
  alt="Description"
  loading="lazy"
>
```

## Accessibility
- Always include descriptive `alt` text
- Use `aria-label` on navigation buttons
- Support keyboard navigation (arrow keys in lightbox/carousel)
- Ensure sufficient color contrast on captions
- Focus trap inside lightbox when open

## Touch Support
- Implement swipe gestures for carousel on mobile
- Pinch-to-zoom in lightbox
- Tap to toggle caption visibility
