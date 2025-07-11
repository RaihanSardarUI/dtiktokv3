import fs from 'fs';
import path from 'path';

export const prerender = false;

export async function GET() {
  try {
    // Read current config
    const configPath = path.join(process.cwd(), 'src/data/dtiktok-config.json');
    const currentConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    return new Response(JSON.stringify(currentConfig, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="dtiktok-config-${new Date().toISOString().split('T')[0]}.json"`
      }
    });
    
  } catch (error) {
    console.error('Error exporting config:', error);
    return new Response(JSON.stringify({ error: 'Failed to export configuration' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 