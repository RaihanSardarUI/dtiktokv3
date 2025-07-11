import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const prerender = false;

// Simple session storage (in production, use Redis or database)
const sessions = new Map();

// Hash password function
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Generate session token
function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Verify session
function verifySession(token) {
  const session = sessions.get(token);
  if (!session) return false;
  
  // Check if session expired
  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return false;
  }
  
  // Extend session
  session.expiresAt = Date.now() + session.timeout;
  return true;
}

export async function POST({ request }) {
  try {
    const { action, ...data } = await request.json();
    
    // Read current config
    const configPath = path.join(process.cwd(), 'src/data/dtiktok-config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    switch (action) {
      case 'login': {
        const { username, password } = data;
        
        // Check credentials
        if (username === config.auth.username && password === config.auth.password) {
          // Generate session token
          const token = generateSessionToken();
          const expiresAt = Date.now() + config.auth.sessionTimeout;
          
          // Store session
          sessions.set(token, {
            username,
            createdAt: Date.now(),
            expiresAt,
            timeout: config.auth.sessionTimeout
          });
          
          return new Response(JSON.stringify({ 
            success: true, 
            token,
            expiresAt,
            message: 'Login successful'
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Set-Cookie': `auth-token=${token}; HttpOnly; Path=/; Max-Age=${config.auth.sessionTimeout / 1000}`
            }
          });
        } else {
          return new Response(JSON.stringify({ 
            success: false, 
            message: 'Invalid username or password'
          }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
      
      case 'logout': {
        const { token } = data;
        
        if (token && sessions.has(token)) {
          sessions.delete(token);
        }
        
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Logout successful'
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': 'auth-token=; HttpOnly; Path=/; Max-Age=0'
          }
        });
      }
      
      case 'verify': {
        const { token } = data;
        
        if (verifySession(token)) {
          const session = sessions.get(token);
          return new Response(JSON.stringify({ 
            success: true, 
            valid: true,
            username: session.username,
            expiresAt: session.expiresAt
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          return new Response(JSON.stringify({ 
            success: false, 
            valid: false,
            message: 'Invalid or expired session'
          }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
      
      case 'change-password': {
        const { token, currentPassword, newPassword } = data;
        
        // Verify session
        if (!verifySession(token)) {
          return new Response(JSON.stringify({ 
            success: false, 
            message: 'Invalid session'
          }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Verify current password
        if (currentPassword !== config.auth.password) {
          return new Response(JSON.stringify({ 
            success: false, 
            message: 'Current password is incorrect'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Update password
        const updatedConfig = {
          ...config,
          auth: {
            ...config.auth,
            password: newPassword,
            lastPasswordChange: new Date().toISOString()
          },
          lastUpdated: new Date().toISOString()
        };
        
        fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2));
        
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Password changed successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      case 'change-username': {
        const { token, password, newUsername } = data;
        
        // Verify session
        if (!verifySession(token)) {
          return new Response(JSON.stringify({ 
            success: false, 
            message: 'Invalid session'
          }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Verify password
        if (password !== config.auth.password) {
          return new Response(JSON.stringify({ 
            success: false, 
            message: 'Password is incorrect'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Update username
        const updatedConfig = {
          ...config,
          auth: {
            ...config.auth,
            username: newUsername
          },
          lastUpdated: new Date().toISOString()
        };
        
        fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2));
        
        // Update session
        const session = sessions.get(token);
        session.username = newUsername;
        
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Username changed successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      default:
        return new Response(JSON.stringify({ 
          success: false, 
          message: 'Invalid action'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }
    
  } catch (error) {
    console.error('Auth error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Authentication error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET({ url }) {
  try {
    const action = url.searchParams.get('action');
    const token = url.searchParams.get('token');
    
    if (action === 'verify' && token) {
      if (verifySession(token)) {
        const session = sessions.get(token);
        return new Response(JSON.stringify({ 
          success: true, 
          valid: true,
          username: session.username,
          expiresAt: session.expiresAt
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        return new Response(JSON.stringify({ 
          success: false, 
          valid: false,
          message: 'Invalid or expired session'
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Invalid request'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Auth GET error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Authentication error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 