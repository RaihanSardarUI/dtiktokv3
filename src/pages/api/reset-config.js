import fs from 'fs';
import path from 'path';

export const prerender = false;

const defaultConfig = {
  "version": "4.4.3",
  "releaseDate": "29.03.25",
  "downloadUrl": "https://www.icloud.com/shortcuts/30721c6b5e934657b27b5490f8ab6e04",
  "fileSize": "1.5MB",
  "iosSupport": "IOS 17 and latest",
  "isActive": true,
  "updateNotes": "Latest stable release with improved performance and bug fixes",
  "lastUpdated": new Date().toISOString(),
  "downloadCount": 15420,
  "features": [
    "Download TikTok Videos Without Watermark",
    "High-Quality Downloads", 
    "Audio-Only Download Option",
    "Fast and Easy to Use",
    "100% Free and Safe",
    "Compatible with Latest iOS Versions",
    "Lightweight and Quick Setup",
    "Regular Updates"
  ],
  "stats": {
    "totalDownloads": 15420,
    "activeUsers": 8500,
    "averageRating": 4.8,
    "supportedDevices": "iPhone, iPad"
  },
  "ads": {
    "ad-header": {
      "enabled": false,
      "name": "Header Banner",
      "code": "<!-- Insert your header ad code here -->",
      "shortcode": "[ad-header]"
    },
    "ad-hero": {
      "enabled": false,
      "name": "Hero Section Ad", 
      "code": "<!-- Insert your hero ad code here -->",
      "shortcode": "[ad-hero]"
    },
    "ad-download": {
      "enabled": false,
      "name": "Download Section Ad",
      "code": "<!-- Insert your download ad code here -->",
      "shortcode": "[ad-download]"
    }
  },
  "seo": {
    "searchConsole": "",
    "analyticsId": "",
    "adsTxt": "",
    "robotsTxt": "",
    "otherVerification": "",
    "customMeta": "",
    "headAdsCode": "",
    "lastUpdated": new Date().toISOString()
  },
  "auth": {
    "username": "admin",
    "password": "admin123",
    "sessionTimeout": 3600000,
    "lastPasswordChange": new Date().toISOString()
  }
};

export async function POST() {
  try {
    // Reset to default configuration
    const configPath = path.join(process.cwd(), 'src/data/dtiktok-config.json');
    
    // Update the last updated timestamp
    const resetConfig = {
      ...defaultConfig,
      lastUpdated: new Date().toISOString()
    };
    
    fs.writeFileSync(configPath, JSON.stringify(resetConfig, null, 2));
    
    return new Response(JSON.stringify({ success: true, config: resetConfig }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.error('Error resetting config:', error);
    return new Response(JSON.stringify({ error: 'Failed to reset configuration' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 