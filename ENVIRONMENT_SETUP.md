# 🔧 Environment Variable Setup

This guide explains how to properly configure environment variables to fix domain/URL issues during development and production.

## 📋 Environment Variables Overview

Your DTikTok website now uses a priority-based system for domain detection:

### Priority Order:
1. **SITE_URL** (highest priority)
2. **CUSTOM_DOMAIN** (custom domain override)
3. **Astro.site** (configuration)
4. **CF_PAGES_URL** (Cloudflare Pages)
5. **Request headers** (fallback)
6. **Default fallback** (localhost:4321 or production domain)

## 🚀 Setup Instructions

### 1. Create Environment File

Create a `.env` file in your project root:

```bash
# .env file
# Environment Configuration for DTikTok

# Site URL - Set this to your actual domain
SITE_URL=http://localhost:4321

# Node environment
NODE_ENV=development

# Optional: Custom domain for production
# CUSTOM_DOMAIN=https://dtiktok.net

# Optional: Port override
# PORT=4321
```

### 2. Development Configuration

For **local development**:
```bash
# .env
SITE_URL=http://localhost:4321
NODE_ENV=development
```

### 3. Production Configuration

For **production deployment**:
```bash
# .env (or set in Cloudflare Pages dashboard)
SITE_URL=https://yourdomain.com
NODE_ENV=production
```

### 4. Cloudflare Pages Setup

In your Cloudflare Pages dashboard → Settings → Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `SITE_URL` | `https://yourdomain.com` | Production |
| `NODE_ENV` | `production` | Production |
| `SITE_URL` | `https://preview.yourdomain.com` | Preview |
| `NODE_ENV` | `preview` | Preview |

## 🔧 Common Configurations

### Local Development
```bash
SITE_URL=http://localhost:4321
NODE_ENV=development
```

### Staging Environment
```bash
SITE_URL=https://staging.yourdomain.com
NODE_ENV=staging
```

### Production Environment
```bash
SITE_URL=https://yourdomain.com
NODE_ENV=production
```

### Custom Domain
```bash
SITE_URL=https://dtiktok.net
CUSTOM_DOMAIN=https://dtiktok.net
NODE_ENV=production
```

## 🛠️ How It Works

### In astro.config.mjs:
```javascript
function getSiteUrl() {
  // 1. Check SITE_URL first
  if (process.env.SITE_URL) {
    return process.env.SITE_URL;
  }
  
  // 2. Check CUSTOM_DOMAIN
  if (process.env.CUSTOM_DOMAIN) {
    return process.env.CUSTOM_DOMAIN;
  }
  
  // 3. Other fallbacks...
}
```

### In Layout.astro:
```javascript
function getCurrentDomain() {
  // 1. Check SITE_URL first
  if (import.meta.env.SITE_URL) {
    return import.meta.env.SITE_URL;
  }
  
  // 2. Check CUSTOM_DOMAIN
  if (import.meta.env.CUSTOM_DOMAIN) {
    return import.meta.env.CUSTOM_DOMAIN;
  }
  
  // 3. Other fallbacks...
}
```

## 🐛 Troubleshooting

### Problem: Domain shows as localhost in production
**Solution**: Set `SITE_URL` environment variable in your hosting dashboard

### Problem: HTTPS/HTTP mismatch
**Solution**: Ensure your `SITE_URL` uses the correct protocol:
- Development: `http://localhost:4321`
- Production: `https://yourdomain.com`

### Problem: Meta tags showing wrong domain
**Solution**: Clear cache and verify environment variables are properly set

### Problem: Environment variables not working
**Solution**: 
1. Restart your development server
2. Check `.env` file is in project root
3. Verify variable names match exactly

## 📝 Testing Your Setup

### 1. Check Current Domain Detection

Add temporary logging to see what domain is being detected:

```javascript
// In Layout.astro (temporary debugging)
console.log('Current domain:', currentDomain);
console.log('Environment variables:', {
  SITE_URL: import.meta.env.SITE_URL,
  CUSTOM_DOMAIN: import.meta.env.CUSTOM_DOMAIN,
  NODE_ENV: import.meta.env.NODE_ENV
});
```

### 2. Test Different Scenarios

```bash
# Test with different SITE_URL values
SITE_URL=http://localhost:3000 npm run dev
SITE_URL=https://test.com npm run dev
```

### 3. Verify Meta Tags

Check your page source to ensure:
- `<meta property="og:url"` shows correct domain
- `<link rel="canonical"` shows correct domain
- `<meta property="og:image"` shows correct domain

## 🔐 Security Notes

1. **Never commit** `.env` files to version control
2. **Use different** environment variables for different environments
3. **Validate** URLs to prevent injection attacks
4. **Use HTTPS** in production environments

## 🚀 Deployment Commands

### Local Development
```bash
# Set environment variable and start dev server
SITE_URL=http://localhost:4321 npm run dev
```

### Build with Custom Domain
```bash
# Build with production domain
SITE_URL=https://yourdomain.com npm run build
```

### Deploy to Cloudflare Pages
```bash
# Deploy with environment variables
SITE_URL=https://yourdomain.com npm run build
npx wrangler pages deploy dist
```

## ✅ Quick Setup Checklist

- [ ] Create `.env` file in project root
- [ ] Set `SITE_URL` to your domain
- [ ] Set `NODE_ENV` appropriately
- [ ] Restart development server
- [ ] Test domain detection in browser
- [ ] Verify meta tags show correct domain
- [ ] Set production environment variables in hosting dashboard
- [ ] Test production deployment

## 📞 Support

If you're still experiencing domain issues after following this guide:

1. **Clear browser cache** completely
2. **Restart development server** after changing environment variables
3. **Check browser console** for any errors
4. **Verify environment variables** are loaded correctly
5. **Test in incognito/private browsing** mode

---

**This should resolve all domain-related issues in your DTikTok website!** 🎉 