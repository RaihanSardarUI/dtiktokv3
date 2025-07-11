import { getDtiktokConfig } from './config.js';

/**
 * Process shortcodes in content and replace with ad code
 * @param {string} content - The content containing shortcodes
 * @returns {string} - Content with shortcodes replaced by ad code
 */
export function processShortcodes(content) {
  if (!content || typeof content !== 'string') {
    return content;
  }

  // Get the latest config
  const dtiktokConfig = getDtiktokConfig();
  
  let processedContent = content;
  
  // Find all shortcodes in the content [ad-something]
  const shortcodeRegex = /\[([^\]]+)\]/g;
  const matches = content.match(shortcodeRegex);
  
  if (!matches) {
    return content;
  }
  
  matches.forEach(match => {
    // Extract the shortcode ID from [ad-something]
    const shortcodeId = match.slice(1, -1); // Remove [ and ]
    
    // Check if this shortcode exists in our ads config
    if (dtiktokConfig.ads && dtiktokConfig.ads[shortcodeId]) {
      const ad = dtiktokConfig.ads[shortcodeId];
      
      // Only replace if the ad is enabled
      if (ad.enabled) {
        processedContent = processedContent.replace(match, ad.code);
      } else {
        // Remove disabled ads (replace with empty string)
        processedContent = processedContent.replace(match, '');
      }
    } else {
      // Unknown shortcode, remove it
      processedContent = processedContent.replace(match, '');
    }
  });
  
  return processedContent;
}

/**
 * Get all available shortcodes
 * @returns {Array} - Array of shortcode objects
 */
export function getAvailableShortcodes() {
  const dtiktokConfig = getDtiktokConfig();
  
  if (!dtiktokConfig.ads) {
    return [];
  }
  
  return Object.entries(dtiktokConfig.ads).map(([id, ad]) => ({
    id,
    shortcode: ad.shortcode,
    name: ad.name,
    enabled: ad.enabled
  }));
}

/**
 * Check if a shortcode exists
 * @param {string} shortcodeId - The shortcode ID to check
 * @returns {boolean} - Whether the shortcode exists
 */
export function shortcodeExists(shortcodeId) {
  const dtiktokConfig = getDtiktokConfig();
  return dtiktokConfig.ads && dtiktokConfig.ads[shortcodeId] !== undefined;
}

/**
 * Get ad code for a specific shortcode
 * @param {string} shortcodeId - The shortcode ID
 * @returns {string} - The ad code or empty string if not found/disabled
 */
export function getAdCode(shortcodeId) {
  const dtiktokConfig = getDtiktokConfig();
  
  if (!dtiktokConfig.ads || !dtiktokConfig.ads[shortcodeId]) {
    return '';
  }
  
  const ad = dtiktokConfig.ads[shortcodeId];
  return ad.enabled ? ad.code : '';
} 