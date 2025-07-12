# Ad Banner Component Usage

## Overview
The `AdBanner` component is a reusable advertisement component that displays your ad script with proper styling and responsive design.

## Location
`src/components/AdBanner.astro`

## Usage

### 1. Import the Component
```astro
---
import AdBanner from '../components/AdBanner.astro';
---
```

### 2. Add to Your Page
```astro
<!-- Basic usage -->
<AdBanner />

<!-- With position -->
<AdBanner position="middle" />

<!-- With custom classes -->
<AdBanner position="top" className="my-custom-class" />
```

## Position Options
- `top` - For ads at the top of content
- `middle` - For ads in the middle of content (default)
- `bottom` - For ads at the bottom of content
- `sidebar` - For sidebar ads (sticky positioning)

## Current Implementation
The component is currently implemented on:

### Homepage (`src/pages/index.astro`)
- After "Why DTikTok is the Best" section
- After "Screenshots" section  
- Before "Conclusion" section

### Add DTikTok Page (`src/pages/add-dtiktok/index.astro`)
- Between advantages sections

## Features
- ✅ **Responsive Design**: Adapts to mobile and desktop
- ✅ **Professional Styling**: Matches site design
- ✅ **Ad Label**: Shows "Advertisement" for transparency
- ✅ **Loading State**: Shows loading message while ad loads
- ✅ **Multiple Positions**: Flexible positioning options

## Ad Configuration
The current ad configuration is:
```javascript
atOptions = {
  'key': '5db4e115c9cae4168f6efca75fe17bd9',
  'format': 'iframe',
  'height': 250,
  'width': 300,
  'params': {}
};
```

## Customization
To change the ad network or configuration, edit the `AdBanner.astro` component and update the `atOptions` object and script source.

## Best Practices
1. **Strategic Placement**: Place ads between content sections for better user experience
2. **Not Too Many**: Limit to 2-3 ads per page to avoid overwhelming users
3. **Mobile Friendly**: The component automatically adjusts for mobile devices
4. **Performance**: Uses `is:inline` directive for proper script loading 