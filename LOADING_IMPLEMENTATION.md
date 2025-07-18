# Page Loading Implementation

This document describes the page loading functionality that has been added to the project.

## Overview

The page loading system provides a smooth user experience by showing loading indicators during page loads and navigation. It includes:

1. **Initial Page Loading**: Full-screen loading overlay with spinner
2. **Navigation Loading**: Top navigation bar for page transitions
3. **Form Loading**: Loading states for form submissions
4. **Resource Preloading**: Preloading of critical resources
5. **Lazy Loading**: Deferred loading of images and iframes

## Components Added

### 1. PageLoader Component (`src/components/PageLoader.astro`)

A comprehensive loading overlay component that includes:
- Full-screen loading overlay with gradient background
- Dual spinning animation (primary and accent colors)
- Loading text and progress bar
- Navigation loading bar for page transitions
- Automatic fade-out animation
- Fallback timeout (5 seconds maximum)

### 2. Loading Utilities (`src/utils/loadingUtils.js`)

A utility class that manages loading states:
- `LoadingManager` class for centralized loading control
- Resource preloading functionality
- Lazy loading with Intersection Observer
- Form submission loading states
- Navigation loading indicators

### 3. Global CSS Styles (`src/styles/global.css`)

Additional CSS for loading functionality:
- Loading animations and transitions
- Spinner improvements
- Progress bar animations
- Layout shift prevention

## Features

### Initial Page Loading
- Shows immediately when page starts loading
- Displays a modern spinner with dual rotation
- Includes progress bar animation
- Automatically hides when page is fully loaded
- Has a 5-second fallback timeout

### Navigation Loading
- Shows a slim loading bar at the top during navigation
- Activates when clicking internal navigation links
- Excludes anchor links, downloads, and external links
- Automatically hides when navigation completes

### Form Loading
- Disables submit buttons during form submission
- Changes button text to "Processing..."
- Shows navigation loader for visual feedback
- Provides reset functionality

### Resource Preloading
- Preloads critical images and assets
- Automatically detects resource types
- Improves perceived performance

### Lazy Loading
- Uses Intersection Observer for efficient loading
- Supports images and iframes with `data-lazy` attribute
- Fallback for browsers without Intersection Observer support

## Usage

### Basic Usage
The loading functionality is automatically initialized when the page loads. No additional setup is required for basic functionality.

### Custom Loading States
```javascript
import { loadingManager } from './src/utils/loadingUtils.js';

// Show/hide page loader manually
loadingManager.showPageLoader();
loadingManager.hidePageLoader();

// Show/hide navigation loader
loadingManager.showNavLoader();
loadingManager.hideNavLoader();

// Preload resources
loadingManager.preloadResources([
  '/path/to/image.jpg',
  '/path/to/script.js'
]);
```

### Lazy Loading Images
```html
<img data-lazy="/path/to/image.jpg" alt="Description" />
```

### Form Loading
```javascript
const form = document.querySelector('#myForm');
const formHandler = loadingManager.handleFormLoading(form, {
  loadingText: 'Submitting...',
  showLoader: true
});

// Reset form state after processing
formHandler.reset();
```

## Integration

The loading system is integrated into:
- `src/layouts/Layout.astro` - Main layout with PageLoader component
- `src/components/PageLoader.astro` - Loading overlay component
- `src/utils/loadingUtils.js` - Loading management utilities
- `src/styles/global.css` - Loading-related styles

## Browser Support

- Modern browsers with ES6+ support
- Graceful fallbacks for older browsers
- Intersection Observer with fallback
- CSS animations with vendor prefixes

## Performance Considerations

- Minimal JavaScript footprint
- CSS animations over JavaScript animations
- Efficient resource preloading
- Intersection Observer for lazy loading
- Automatic cleanup and memory management

## Customization

### Styling
Modify the loading styles in `src/components/PageLoader.astro` or `src/styles/global.css`:
- Change colors using CSS custom properties
- Adjust animation durations
- Modify spinner styles
- Update progress bar appearance

### Behavior
Customize loading behavior in `src/utils/loadingUtils.js`:
- Adjust timeout durations
- Modify loading triggers
- Add custom loading states
- Configure preloading resources

### Configuration
Update the loading configuration in `src/layouts/Layout.astro`:
- Add/remove preloaded resources
- Configure lazy loading settings
- Modify form loading options