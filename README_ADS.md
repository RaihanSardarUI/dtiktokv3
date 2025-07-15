# Advertisement Integration Guide

This guide explains how to use the `AdBanner` component for displaying advertisements on the DTikTok website.

## ⚡ Performance Optimizations

The `AdBanner` component has been optimized for performance with the following features:

- **Asynchronous Loading**: Ad scripts load asynchronously to avoid blocking the critical rendering path
- **Lazy Loading**: Ads load only when they come into view (default behavior)
- **Intersection Observer**: Uses modern browser APIs for efficient lazy loading
- **Error Handling**: Graceful fallbacks for failed ad loads
- **Non-blocking**: No impact on Largest Contentful Paint (LCP) scores

## 🚀 Usage

### Basic Usage

```astro
---
import AdBanner from '../components/AdBanner.astro';
---

<AdBanner position="middle" />
```

### Advanced Usage with Performance Control

```astro
<!-- Lazy load when ad comes into view (default) -->
<AdBanner position="middle" lazy={true} />

<!-- Load immediately but still async (for above-the-fold ads) -->
<AdBanner position="top" lazy={false} />

<!-- Custom styling -->
<AdBanner position="sidebar" className="custom-ad-styles" />
```

## 📍 Position Options

- `top`: Above-the-fold placement with immediate loading
- `middle`: Standard content placement with lazy loading
- `bottom`: Below-the-fold placement with lazy loading
- `sidebar`: Sticky sidebar placement

## 🎯 Current Implementation

### Homepage (`src/pages/index.astro`)
1. **Above hero logo** - `<AdBanner position="top" lazy={false} />`
2. **After version badge** - `<AdBanner position="middle" />`
3. **After CTA button** - `<AdBanner position="middle" />`
4. **After hero section** - `<AdBanner position="middle" />`
5. **After "Why DTikTok is the Best"** - `<AdBanner position="middle" />`
6. **In download section** - `<AdBanner position="middle" />`
7. **After Screenshots** - `<AdBanner position="middle" />`
8. **Before Conclusion** - `<AdBanner position="bottom" />`

### Add DTikTok Page (`src/pages/add-dtiktok/index.astro`)
1. **Between advantages sections** - `<AdBanner position="middle" />`

## 🔧 Technical Details

### Ad Network Configuration
- **Network**: cautiouslyanalysecrystal.com
- **Ad Key**: 5db4e115c9cae4168f6efca75fe17bd9
- **Format**: iframe (300x250 desktop, 260x200 mobile)

### Performance Features
- **Async Loading**: All ad scripts load asynchronously
- **Intersection Observer**: Lazy loading with 50px margin
- **Error Handling**: Graceful fallbacks for network issues
- **Responsive Design**: Automatic size adjustments
- **Loading States**: Visual feedback during load

### Browser Support
- Modern browsers with IntersectionObserver support
- Fallback to immediate async loading for older browsers

## 🎨 Styling

The component includes professional styling that matches the site design:

```css
/* Responsive container */
.ad-container {
  max-width: 320px;
  background: rgba(31, 41, 55, 0.5);
  border: 1px solid #374151;
  border-radius: 0.5rem;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .ad-container {
    max-width: 280px;
  }
}
```

## 🔍 Performance Monitoring

To monitor ad performance:

1. **Core Web Vitals**: Check LCP, FID, and CLS metrics
2. **Network Tab**: Monitor async loading behavior
3. **Lighthouse**: Verify no blocking resources
4. **Console**: Check for any loading errors

## 📊 Best Practices

### For Above-the-Fold Ads
```astro
<!-- Load immediately but still async -->
<AdBanner position="top" lazy={false} />
```

### For Below-the-Fold Ads
```astro
<!-- Use lazy loading (default) -->
<AdBanner position="middle" />
```

### For Sidebar Ads
```astro
<!-- Sticky positioning with lazy loading -->
<AdBanner position="sidebar" />
```

## 🛠️ Troubleshooting

### Common Issues

1. **Ads not loading**: Check network connectivity and ad blocker settings
2. **Performance impact**: Ensure lazy loading is enabled for below-the-fold ads
3. **Layout shifts**: The component reserves space to prevent CLS issues

### Debug Mode
Enable console logging to debug ad loading:
```javascript
// Check for ad loading errors in browser console
console.log('Ad loading status:', window.atOptions);
```

## 🚀 Future Enhancements

- A/B testing for ad placements
- Revenue tracking integration
- Additional ad network support
- Dynamic ad sizing based on content 