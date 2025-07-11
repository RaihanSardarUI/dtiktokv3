# Shortcode Ad System - Usage Examples

## 🎯 How to Use Your New Shortcode Ad System

### **Method 1: Direct Component Usage (Recommended)**
```astro
---
import AdSlot from '../components/AdSlot.astro';
---

<!-- Place ads anywhere using the component -->
<AdSlot id="ad-header" />
<AdSlot id="ad-hero" />
<AdSlot id="ad-download" />
```

### **Method 2: Manual HTML with set:html**
```astro
---
import dtiktokConfig from '../data/dtiktok-config.json';

const headerAd = dtiktokConfig.ads?.['ad-header'];
const headerAdCode = headerAd?.enabled ? headerAd.code : '';
---

<div set:html={headerAdCode}></div>
```

## 📍 **Strategic Placement Examples**

### **Homepage (src/pages/index.astro)**
```astro
---
import Layout from '../layouts/Layout.astro';
import AdSlot from '../components/AdSlot.astro';
import dtiktokConfig from '../data/dtiktok-config.json';
---

<Layout title="DTikTok" description="Download TikTok videos">
  
  <!-- Header Ad -->
  <AdSlot id="ad-header" />
  
  <!-- Hero Section -->
  <section class="hero">
    <AdSlot id="ad-hero-top" />
    <h1>DTikTok v{dtiktokConfig.version}</h1>
    <AdSlot id="ad-hero-bottom" />
  </section>
  
  <!-- Features Section -->
  <section class="features">
    <AdSlot id="ad-before-features" />
    <div class="features-grid">...</div>
    <AdSlot id="ad-after-features" />
  </section>
  
  <!-- Download Section -->
  <section class="download">
    <AdSlot id="ad-download-top" />
    <button>Get DTikTok</button>
    <AdSlot id="ad-download-bottom" />
  </section>
  
</Layout>
```

### **Layout (src/layouts/Layout.astro)**
```astro
---
import AdSlot from '../components/AdSlot.astro';
---

<html>
<head>
  <!-- Head content -->
</head>
<body>
  
  <!-- Header Banner -->
  <AdSlot id="ad-header-banner" />
  
  <header>
    <nav>...</nav>
    <AdSlot id="ad-header-bottom" />
  </header>
  
  <main>
    <AdSlot id="ad-content-top" />
    <slot />
    <AdSlot id="ad-content-bottom" />
  </main>
  
  <footer>
    <AdSlot id="ad-footer-top" />
    <p>© 2024 DTikTok</p>
    <AdSlot id="ad-footer-bottom" />
  </footer>
  
</body>
</html>
```

### **Add DTikTok Page**
```astro
---
import AdSlot from '../../components/AdSlot.astro';
---

<Layout>
  
  <!-- Before comparison -->
  <AdSlot id="ad-comparison-intro" />
  
  <!-- DTikTok vs Water Eject section -->
  <section class="comparison">
    <AdSlot id="ad-comparison-middle" />
  </section>
  
  <!-- After advantages -->
  <AdSlot id="ad-advantages-bottom" />
  
  <!-- Before conclusion -->
  <AdSlot id="ad-conclusion-top" />
  
</Layout>
```

## 🎨 **Dashboard Workflow**

### **Step 1: Create Ad in Dashboard**
1. Go to `http://localhost:4321/admin/dashboard`
2. Scroll to "Ad Management (Shortcode System)"
3. Fill in the form:
   - **Ad Name**: "Hero Banner Ad"
   - **Shortcode ID**: "ad-hero-banner"
   - **Ad Code**: Paste your Google AdSense or HTML code
4. Click "Create Ad Shortcode"

### **Step 2: Place in Code**
```astro
<!-- Add this anywhere in your .astro files -->
<AdSlot id="ad-hero-banner" />
```

### **Step 3: Manage from Dashboard**
- **Enable/Disable**: Toggle switch for each ad
- **Update Content**: Change ad code anytime
- **Delete**: Remove ads you no longer need

## 🔥 **Real-World Examples**

### **Google AdSense Integration**
```javascript
// In dashboard, create shortcode: ad-adsense-banner
// Ad Code:
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### **Custom HTML Banner**
```html
<!-- In dashboard, create shortcode: ad-custom-banner -->
<!-- Ad Code: -->
<div style="text-align: center; padding: 20px; background: #f0f0f0; border-radius: 8px; margin: 20px 0;">
  <a href="https://example.com" target="_blank">
    <img src="/banner-ad.jpg" alt="Advertisement" style="max-width: 100%; height: auto;">
  </a>
</div>
```

### **Affiliate Marketing Banner**
```html
<!-- In dashboard, create shortcode: ad-affiliate -->
<!-- Ad Code: -->
<div class="affiliate-banner">
  <a href="https://affiliate-link.com" target="_blank" rel="noopener">
    <div style="background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); 
                color: white; padding: 15px; text-align: center; border-radius: 10px;">
      <h3>🎯 Special Offer - 50% Off!</h3>
      <p>Premium TikTok Tools - Limited Time</p>
      <button style="background: white; color: #667eea; padding: 8px 16px; border: none; border-radius: 5px; font-weight: bold;">
        Learn More →
      </button>
    </div>
  </a>
</div>
```

## 📋 **Shortcode Naming Conventions**

### **By Location**
- `ad-header` - Header banner
- `ad-hero` - Hero section
- `ad-sidebar` - Sidebar placement
- `ad-footer` - Footer banner
- `ad-content-top` - Top of content
- `ad-content-bottom` - Bottom of content

### **By Size/Type**
- `ad-banner-728x90` - Leaderboard banner
- `ad-square-300x300` - Square ad
- `ad-mobile-320x50` - Mobile banner
- `ad-skyscraper-160x600` - Vertical banner

### **By Page**
- `ad-homepage-hero` - Homepage specific
- `ad-dtiktok-comparison` - Add DTikTok page
- `ad-privacy-notice` - Privacy page

## ⚡ **Performance Tips**

### **Lazy Loading Ads**
```astro
<div style="min-height: 250px;">
  <AdSlot id="ad-lazy-banner" />
</div>
```

### **Mobile vs Desktop Ads**
```astro
---
const isMobile = Astro.request.headers.get('user-agent')?.includes('Mobile');
---

{isMobile ? (
  <AdSlot id="ad-mobile-banner" />
) : (
  <AdSlot id="ad-desktop-banner" />
)}
```

### **Conditional Ads by Page**
```astro
---
const isHomepage = Astro.url.pathname === '/';
---

{isHomepage && <AdSlot id="ad-homepage-special" />}
```

## 🛠️ **Advanced Usage**

### **Multiple Ads in Sequence**
```astro
<AdSlot id="ad-banner-1" />
<AdSlot id="ad-banner-2" />
<AdSlot id="ad-banner-3" />
```

### **Fallback Content**
```astro
<AdSlot id="ad-premium" fallback="<p>Premium content area</p>" />
```

### **Custom Styling**
```astro
<div class="ad-container">
  <AdSlot id="ad-styled" />
</div>

<style>
.ad-container {
  max-width: 728px;
  margin: 0 auto;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
}
</style>
```

This system gives you **complete control** over ad placement while keeping management centralized in your dashboard! 