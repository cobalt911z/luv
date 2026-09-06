---
name: github-pages-deploy
description: Configure and deploy static HTML/CSS/JS websites to GitHub Pages. Handles repository setup, gh-pages branch, deployment workflows, and custom domain configuration.
---

# GitHub Pages Deployment Skill

## Overview
This skill provides instructions for deploying static websites to GitHub Pages, including repository configuration, file structure, and deployment workflows.

## Deployment Strategy

### File Structure for GitHub Pages
```
project-root/
├── index.html          # Main entry point (required)
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── main.js         # Main JavaScript
├── assets/
│   ├── images/         # Image assets
│   ├── audio/          # Audio files
│   └── fonts/          # Custom fonts
├── .nojekyll           # Disable Jekyll processing
└── README.md           # Project documentation
```

### Key Rules
1. **Always create `.nojekyll`** file in root to prevent Jekyll processing issues
2. **Use relative paths** for all assets (e.g., `./css/style.css`, `./assets/images/photo.jpg`)
3. **`index.html` must be in root** — GitHub Pages serves from root by default
4. **All file/folder names should be lowercase** with hyphens for spaces
5. **Optimize images** before deploying — compress to WebP or optimized JPEG/PNG
6. **Keep total repo size under 1GB** — GitHub Pages has a 1GB limit

### Deployment Methods

#### Method 1: Direct `main` branch (Simplest)
- Push all files to `main` branch
- In GitHub repo Settings → Pages → Source: select `main` branch, `/ (root)`
- Site will be live at `https://<username>.github.io/<repo-name>/`

#### Method 2: `gh-pages` branch
- Create orphan `gh-pages` branch: `git checkout --orphan gh-pages`
- Push only production files to this branch
- In Settings → Pages → Source: select `gh-pages` branch

### GitHub Actions Workflow (Optional)
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Custom Domain Setup
1. Add `CNAME` file with domain name in root
2. Configure DNS: CNAME record pointing to `<username>.github.io`
3. Enable HTTPS in GitHub Pages settings

### Performance Tips
- Use `loading="lazy"` on images below the fold
- Minify CSS/JS for production
- Use `<link rel="preload">` for critical resources
- Leverage browser caching with proper asset naming

### Verification Checklist
- [ ] `index.html` exists at root
- [ ] `.nojekyll` file present
- [ ] All paths are relative
- [ ] Images are optimized
- [ ] Site works with base URL `/<repo-name>/`
- [ ] Mobile responsive design
- [ ] HTTPS enabled
