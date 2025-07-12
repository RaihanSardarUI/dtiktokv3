# 🚀 Cloudflare Pages Deployment Guide

Your DTikTok application has been updated for Cloudflare Pages compatibility! Follow these steps to deploy.

## 📋 Prerequisites

1. **Cloudflare Account** - [Sign up for free](https://cloudflare.com)
2. **Wrangler CLI** - Already included in project
3. **GitHub Repository** - For Pages integration

## 🔧 Setup Cloudflare KV Storage

### Step 1: Create KV Namespaces

```bash
# Install dependencies first
npm install

# Login to Cloudflare
npx wrangler login

# Create production KV namespace
npx wrangler kv:namespace create "KV_DTIKTOK"

# Create preview KV namespace  
npx wrangler kv:namespace create "KV_DTIKTOK" --preview
```

### Step 2: Update wrangler.toml

After creating KV namespaces, you'll get IDs like:
```
🌀 Creating namespace with title "dtiktokv3-KV_DTIKTOK"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "KV_DTIKTOK", id = "abc123def456..." }
```

Replace the placeholder IDs in `wrangler.toml`:

```toml
[[env.production.kv_namespaces]]
binding = "KV_DTIKTOK"
id = "YOUR_ACTUAL_KV_NAMESPACE_ID"      # ← Replace this
preview_id = "YOUR_ACTUAL_PREVIEW_ID"   # ← Replace this
```

## 🚀 Deployment Options

### Option A: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: Cloudflare Pages compatibility"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
   - Click "Connect to Git"
   - Select your GitHub repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Root directory**: `/` (leave empty)

3. **Set Environment Variables**:
   In Cloudflare Pages dashboard → Settings → Environment Variables:
   - `NODE_VERSION`: `18` or `20`

4. **Configure KV Bindings**:
   In Cloudflare Pages dashboard → Settings → Functions:
   - Add KV namespace binding:
     - **Variable name**: `KV_DTIKTOK`
     - **KV namespace**: Select your created namespace

### Option B: Direct Deployment

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name dtiktokv3
```

## 🔐 Initial Setup After Deployment

1. **First Time Login**:
   - Visit your deployed site: `https://dtiktokv3.pages.dev`
   - Go to `/admin/login`
   - Use default credentials:
     - **Username**: `admin`
     - **Password**: `admin123`

2. **Change Default Credentials**:
   - Go to Security tab in dashboard
   - Change both username and password immediately

3. **Configure Your Site**:
   - Update shortcut information in Configuration tab
   - Set up SEO settings in SEO & Analytics tab
   - Configure ads if needed in Ad Management tab

## 🔧 Development Workflow

### Local Development
```bash
# Start development server (uses file system)
npm run dev
```

### Cloudflare Development
```bash
# Build and test with Cloudflare Functions locally
npm run build
npm run cf:dev
```

### Deploy Updates
```bash
# Automatic deployment (if using GitHub integration)
git add .
git commit -m "your changes"
git push origin main

# Manual deployment
npm run cf:deploy
```

## 📊 KV Storage Structure

Your data is stored in Cloudflare KV with these keys:

- `config` - Main configuration (JSON)
- `session:{token}` - User sessions (JSON, auto-expire)

## 🔍 Monitoring & Debugging

### View KV Data
```bash
# List all keys
npx wrangler kv:key list --binding=KV_DTIKTOK

# Get config
npx wrangler kv:key get "config" --binding=KV_DTIKTOK

# Delete session (if needed)
npx wrangler kv:key delete "session:token-here" --binding=KV_DTIKTOK
```

### Check Logs
```bash
# View function logs
npx wrangler pages deployment tail
```

## 🆘 Troubleshooting

### Common Issues

1. **"KV_DTIKTOK is not defined"**:
   - Ensure KV binding is configured in Pages dashboard
   - Check wrangler.toml has correct namespace IDs

2. **Sessions not working**:
   - Verify KV namespace binding name is exactly `KV_DTIKTOK`
   - Check browser allows cookies

3. **Build failures**:
   - Ensure Node.js version is 18+ in environment variables
   - Check all dependencies are properly installed

4. **File system errors**:
   - These only affect development mode
   - Production uses KV storage automatically

### Reset Configuration
If you need to reset to defaults:
```bash
npx wrangler kv:key delete "config" --binding=KV_DTIKTOK
```

## ✅ Success Checklist

- [ ] KV namespaces created
- [ ] wrangler.toml updated with real IDs
- [ ] Site deployed and accessible
- [ ] Admin login works
- [ ] Default credentials changed
- [ ] Configuration saves properly
- [ ] Sessions persist correctly

## 🎯 Performance Benefits

✅ **Global Edge Deployment** - Your site loads fast worldwide  
✅ **Automatic Scaling** - Handles traffic spikes effortlessly  
✅ **Zero Cold Starts** - Instant response times  
✅ **Free Tier Available** - 100,000 requests/day included  
✅ **Built-in CDN** - Static assets cached globally  

Your DTikTok application is now ready for Cloudflare Pages! 🎉 