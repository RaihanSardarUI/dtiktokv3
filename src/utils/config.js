import fs from 'fs';
import path from 'path';

export function getDtiktokConfig() {
  try {
    const configPath = path.join(process.cwd(), 'src/data/dtiktok-config.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('Error reading config:', error);
    // Return default config if file read fails
    return {
      version: '4.4.3',
      releaseDate: '29.03.25',
      downloadUrl: 'https://www.icloud.com/shortcuts/30721c6b5e934657b27b5490f8ab6e04',
      fileSize: '1.5MB',
      iosSupport: 'iOS 17 and latest',
      isActive: true,
      updateNotes: 'Latest stable release with improved performance and bug fixes',
      stats: {
        totalDownloads: 125000,
        activeUsers: 45000,
        averageRating: 4.8
      }
    };
  }
} 