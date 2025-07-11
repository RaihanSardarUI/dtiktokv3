# DTikTok Dashboard System

## Overview
A complete admin dashboard system for managing DTikTok shortcut configuration dynamically without editing code.

## Features

### 📊 Real-time Statistics Dashboard
- **Total Downloads**: Track download count
- **Active Users**: Monitor user engagement  
- **Average Rating**: Display user rating
- **Status**: Show active/inactive status

### ⚙️ Dynamic Configuration Management
- **Version Control**: Update shortcut version number
- **Download URL**: Modify iCloud shortcut link
- **Release Information**: Update release date and notes
- **iOS Support**: Specify supported iOS versions
- **File Size**: Update shortcut file size
- **Active Status**: Toggle shortcut availability

### 🎯 Features Management
- **Dynamic Features List**: Add/remove/edit feature descriptions
- **Automatic Styling**: Features get different colored themes automatically
- **Flexible Content**: Supports custom feature descriptions

### 🔄 Export & Import
- **Export Configuration**: Download backup as JSON file
- **Reset to Defaults**: Restore original configuration
- **Version Control**: Track configuration changes

## How to Access

### Dashboard URL
```
http://localhost:4321/admin/dashboard
```

## How to Use

### 1. Update Basic Configuration
1. Navigate to the **Shortcut Configuration** section
2. Update any field:
   - Version (e.g., "4.4.4")
   - Release Date (e.g., "15.01.25")
   - Download URL (full iCloud shortcut URL)
   - File Size (e.g., "1.6MB")
   - iOS Support (e.g., "iOS 18 and latest")
   - Update Notes (describe changes)
   - Active Status (toggle on/off)
3. Click **Update Configuration**

### 2. Manage Statistics
1. Go to **Statistics Management** section
2. Update:
   - Total Downloads
   - Active Users  
   - Average Rating (0-5.0)
   - Supported Devices
3. Click **Update Statistics**

### 3. Edit Features
1. In **Features Management** section:
   - Edit existing feature titles
   - Click "Add Feature" to add new ones
   - Click red delete button to remove features
2. Click **Update Features**

### 4. Export/Import Configuration
- **Export**: Click "Export Config" to download current settings
- **Reset**: Click "Reset Config" to restore defaults (requires confirmation)

## File Structure

```
src/
├── data/
│   └── dtiktok-config.json          # Central configuration file
├── pages/
│   ├── admin/
│   │   └── dashboard.astro          # Dashboard interface
│   └── api/
│       ├── update-config.js         # Update API endpoint
│       ├── export-config.js         # Export API endpoint
│       └── reset-config.js          # Reset API endpoint
├── pages/index.astro                # Updated to use dynamic config
├── pages/add-dtiktok/index.astro    # Updated to use dynamic config
└── layouts/Layout.astro             # Updated to use dynamic config
```

## Configuration File Format

```json
{
  "version": "4.4.3",
  "releaseDate": "29.03.25", 
  "downloadUrl": "https://www.icloud.com/shortcuts/...",
  "fileSize": "1.5MB",
  "iosSupport": "IOS 17 and latest",
  "isActive": true,
  "updateNotes": "Latest stable release...",
  "lastUpdated": "2025-01-12T00:00:00.000Z",
  "downloadCount": 15420,
  "features": [
    "Download TikTok Videos Without Watermark",
    "High-Quality Downloads",
    // ... more features
  ],
  "stats": {
    "totalDownloads": 15420,
    "activeUsers": 8500,
    "averageRating": 4.8,
    "supportedDevices": "iPhone, iPad"
  }
}
```

## Dynamic Integration

### Pages Using Dynamic Config
- **Homepage (/)**: Version badge, download URL, features list
- **Add DTikTok (/add-dtiktok/)**: Download buttons, version info
- **Layout**: Navigation version, footer links, structured data

### Real-time Updates
- Changes in dashboard immediately reflect across all pages
- No code editing required
- Automatic styling and theming
- SEO metadata updates automatically

## API Endpoints

### POST /api/update-config
Update configuration sections:
```javascript
{
  "type": "config|stats|features",
  "data": { /* updated values */ }
}
```

### GET /api/export-config
Download current configuration as JSON file

### POST /api/reset-config  
Reset all settings to defaults

## Security Features

- Admin-only access (add authentication as needed)
- Backup before reset functionality
- Error handling and validation
- Toast notifications for user feedback

## Development Notes

### Adding New Configuration Fields
1. Add field to `dtiktok-config.json`
2. Add form input to dashboard
3. Update API endpoint logic
4. Use field in pages with `{dtiktokConfig.fieldName}`

### Extending Features
- Add new statistics tracking
- Create additional export formats
- Implement user authentication
- Add configuration history/versioning

## Usage Examples

### Update Version
1. Open dashboard
2. Change version from "4.4.3" to "4.5.0"
3. Update release date to current date
4. Add update notes describing changes
5. Click "Update Configuration"
6. All pages now show v4.5.0

### Add New Feature
1. In Features Management, click "Add Feature"
2. Enter: "Advanced Video Quality Options"
3. Click "Update Features"
4. New feature appears on homepage with automatic styling

### Change Download URL
1. Update "Download URL" field with new iCloud link
2. Click "Update Configuration"  
3. All download buttons site-wide now use new URL

## Troubleshooting

### Dashboard Not Loading
- Check if Astro dev server is running
- Verify `/admin/dashboard` URL path

### Changes Not Saving
- Check browser console for JavaScript errors
- Verify API endpoints are accessible
- Check file permissions on `dtiktok-config.json`

### Features Not Displaying
- Ensure features array is valid JSON
- Check for empty feature titles
- Verify features form submission

## Benefits

✅ **No Code Editing**: Update content through web interface  
✅ **Real-time Changes**: Instant updates across all pages  
✅ **User Friendly**: Intuitive dashboard design  
✅ **Backup Safety**: Export/import functionality  
✅ **Version Control**: Track all configuration changes  
✅ **Responsive Design**: Works on desktop and mobile  
✅ **Professional UI**: Modern glass morphism design  
✅ **Toast Notifications**: Clear feedback for all actions  

## Future Enhancements

- [ ] User authentication system
- [ ] Configuration change history
- [ ] Bulk feature import/export
- [ ] Advanced analytics dashboard
- [ ] Automated backups
- [ ] Multi-language support
- [ ] A/B testing for different configurations

---

**Need Help?** The dashboard includes helpful tooltips and clear visual feedback for all operations. 