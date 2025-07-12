# DTikTok v3 🎵

**The #1 TikTok Video Downloader Shortcut Website for iOS Devices**

A modern, fast, and accessible website built with Astro and deployed on Cloudflare Pages. This project provides information and download links for the DTikTok iOS Shortcut, allowing users to download TikTok videos without watermarks directly to their iPhone or iPad.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://dtiktokv3.pages.dev)
[![Version](https://img.shields.io/badge/Version-4.4.3-green?style=for-the-badge)](https://www.icloud.com/shortcuts/30721c6b5e934657b27b5490f8ab6e04)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

## ✨ Features

### 🎯 **Core Features**
- Download TikTok videos without watermarks
- High-quality video downloads
- Audio-only download option
- Fast and easy to use interface
- 100% free and safe
- Compatible with iOS 17+ devices
- Lightweight setup (1.5MB)
- Regular updates and maintenance

### 🚀 **Technical Features**
- **Server-Side Rendering (SSR)** with Astro + Cloudflare
- **Domain-Agnostic** - works on any domain automatically
- **Accessibility Compliant** - WCAG 2.1 AA standards
- **SEO Optimized** - Dynamic meta tags and structured data
- **Performance Optimized** - 556KB bundle size
- **Mobile-First** responsive design
- **Modern CSS** with Tailwind + DaisyUI

## 🛠️ Technology Stack

- **Framework**: [Astro](https://astro.build/) v5.11.0
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts
- **Icons**: Heroicons + Custom SVGs
- **Build Tool**: Vite (built into Astro)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/dtiktokv3.git
cd dtiktokv3
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:4321
```

## 🧞 Commands

All commands are run from the root of the project:

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |
| `npm run astro check` | Run Astro diagnostics |
| `npm run astro -- --help` | Get help with Astro CLI |

## 📁 Project Structure

```
dtiktokv3/
├── public/                 # Static assets
│   ├── favicon/           # Favicon files
│   ├── DTikTok.webp      # Logo and images
│   └── robots.txt        # SEO robots file
├── src/
│   ├── layouts/
│   │   └── Layout.astro  # Main layout template
│   ├── pages/            # File-based routing
│   │   ├── index.astro   # Homepage
│   │   ├── add-dtiktok/  # Download page
│   │   ├── privacy-policy/
│   │   ├── terms-and-conditions/
│   │   ├── disclaimer/
│   │   ├── cookie-policy/
│   │   └── 404.astro     # Error page
│   └── styles/
│       └── global.css    # Global styles
├── astro.config.mjs      # Astro configuration
├── tailwind.config.js    # Tailwind configuration
├── wrangler.toml         # Cloudflare configuration
└── package.json          # Dependencies
```

## 🔄 Version Update Process

When releasing a new DTikTok shortcut version, you need to update **3 files**:

### 📝 Files to Update:

#### 1. `src/layouts/Layout.astro` (Lines 22-24)
```javascript
const dtiktokConfig = {
  version: "4.4.3",           // ← Change version here
  releaseDate: "29.03.25",    // ← Change date here  
  downloadUrl: "https://www.icloud.com/shortcuts/30721c6b5e934657b27b5490f8ab6e04", // ← Change URL here
```

#### 2. `src/pages/index.astro` (Lines 8-10)
```javascript
const dtiktokConfig = {
  version: "4.4.3",           // ← Change version here
  releaseDate: "29.03.25",    // ← Change date here
  downloadUrl: "https://www.icloud.com/shortcuts/30721c6b5e934657b27b5490f8ab6e04", // ← Change URL here
```

#### 3. `src/pages/add-dtiktok/index.astro` (Lines 8-10)
```javascript
const dtiktokConfig = {
  version: "4.4.3",           // ← Change version here
  releaseDate: "29.03.25",    // ← Change date here
  downloadUrl: "https://www.icloud.com/shortcuts/30721c6b5e934657b27b5490f8ab6e04", // ← Change URL here
```

### 🔧 Additional Updates Needed:

**In `src/pages/add-dtiktok/index.astro`:**
- **Line 28**: Meta description version number
- **Line 123**: Display version `<span>4.4.3</span>`
- **Line 127**: Display date `<span>29.03.25</span>`

**In `src/pages/index.astro`:**
- **Line 687**: Display version `<p>4.4.3</p>`

### 📋 Update Checklist:

- [ ] Update version in all 3 config objects
- [ ] Update releaseDate in all 3 config objects  
- [ ] Update downloadUrl in all 3 config objects
- [ ] Update hardcoded version displays
- [ ] Update hardcoded date displays
- [ ] Test locally: `npm run dev`
- [ ] Build: `npm run build`
- [ ] Deploy: `npx wrangler pages deploy dist`

### Example - Releasing v4.5.0:
```javascript
// Change from:
version: "4.4.3",
releaseDate: "29.03.25", 
downloadUrl: "https://www.icloud.com/shortcuts/OLD_URL",

// Change to:
version: "4.5.0",
releaseDate: "15.04.25",
downloadUrl: "https://www.icloud.com/shortcuts/NEW_URL",
```

## 🚀 Deployment

### Cloudflare Pages Deployment

1. **Build the project**
```bash
npm run build
```

2. **Deploy with Wrangler**
```bash
npx wrangler pages deploy dist
```

3. **Environment Setup** (if needed)
- Login: `npx wrangler auth login`
- Project setup: `npx wrangler pages project create dtiktokv3`

### Environment Variables
The project is designed to be domain-agnostic and works without environment variables.

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliant**
- **Screen Reader Support** with ARIA labels
- **Keyboard Navigation** friendly
- **High Contrast** color scheme
- **Semantic HTML** structure
- **Alt text** for all images
- **Focus indicators** for interactive elements

## 🎨 Design Features

- **Dark Theme** optimized
- **Responsive Design** (mobile-first)
- **Glass Morphism** effects
- **Gradient Animations**
- **Hover Effects** and transitions
- **Loading States** and micro-interactions
- **Modern Typography** with Inter font

## 📈 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Bundle Size**: 556KB (optimized)
- **CSS**: Separate files for better caching
- **Images**: WebP format with lazy loading
- **Fonts**: Optimized loading with font-display: swap

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm run astro check`
5. Commit changes: `git commit -m 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Submit a pull request

## 📞 Support

- **TikTok**: [@dtiktokshortcut](https://www.tiktok.com/@dtiktokshortcut)
- **Website**: [DTikTok Official](https://dtiktokv3.pages.dev)

## ⚖️ Legal

- **Disclaimer**: Not affiliated with TikTok or ByteDance Ltd.
- **Trademark**: TikTok is a registered trademark of ByteDance Ltd.
- **Usage**: Educational and personal use only. Respect copyright laws.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by RHN** | **Powered by Astro & Cloudflare**