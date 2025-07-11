import fs from 'fs';
import path from 'path';

export const prerender = false;

export async function POST({ request }) {
  try {
    const { type, data } = await request.json();
    
    // Read current config
    const configPath = path.join(process.cwd(), 'src/data/dtiktok-config.json');
    const currentConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    let updatedConfig = { ...currentConfig };
    
    switch (type) {
      case 'config':
        updatedConfig = {
          ...updatedConfig,
          ...data,
          lastUpdated: new Date().toISOString()
        };
        break;
        
      case 'ads':
        const { action, data: adData } = data;
        switch (action) {
          case 'create':
            updatedConfig.ads = {
              ...updatedConfig.ads,
              ...adData
            };
            break;
          case 'update':
            updatedConfig.ads = {
              ...updatedConfig.ads,
              ...adData
            };
            break;
          case 'delete':
            const { adId } = adData;
            delete updatedConfig.ads[adId];
            break;
        }
        updatedConfig.lastUpdated = new Date().toISOString();
        break;
      
      case 'seo':
        updatedConfig.seo = {
          ...updatedConfig.seo,
          ...data
        };
        updatedConfig.lastUpdated = new Date().toISOString();
        break;
        
      default:
        return new Response(JSON.stringify({ error: 'Invalid update type. Valid types: config, ads, seo' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        });
    }
    
    // Write updated config
    fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2));
    
    return new Response(JSON.stringify({ success: true, config: updatedConfig }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.error('Error updating config:', error);
    return new Response(JSON.stringify({ error: 'Failed to update configuration' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 