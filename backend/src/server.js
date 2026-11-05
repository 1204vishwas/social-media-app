import http from 'node:http';
import { ENV } from './config/env.js';
import * as authCtrl from './controllers/authController.js';
import * as postCtrl from './controllers/postController.js';
import * as storyCtrl from './controllers/storyController.js';
import * as reelCtrl from './controllers/reelController.js';
import * as chatCtrl from './controllers/chatController.js';
import * as userCtrl from './controllers/userController.js';

const PORT = ENV.PORT || 5000;

function startServer(port) {
  const server = http.createServer(async (req, res) => {
    // CORS Preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });
      return res.end();
    }

    const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    try {
      // 1. Health Check
      if (method === 'GET' && (pathname === '/api/health' || pathname === '/')) {
        return sendJson(res, 200, {
          status: 'online',
          system: 'AURA Dual Reality Network API',
          version: '2.0.0',
          runtime: 'Node.js Native JavaScript',
          timestamp: new Date().toISOString(),
        });
      }

      // 2. Auth Endpoints
      if (pathname === '/api/v1/auth/login' && method === 'POST') {
        const body = await parseBody(req);
        return sendJson(res, 200, authCtrl.login(body));
      }

      if (pathname === '/api/v1/auth/register' && method === 'POST') {
        const body = await parseBody(req);
        return sendJson(res, 201, authCtrl.register(body));
      }

      if (pathname === '/api/v1/auth/google' && method === 'POST') {
        const body = await parseBody(req);
        return sendJson(res, 200, authCtrl.googleAuth(body));
      }

      // 3. Posts Endpoints
      if (pathname === '/api/v1/posts' && method === 'GET') {
        const vibe = parsedUrl.searchParams.get('vibe');
        return sendJson(res, 200, postCtrl.getFeed(vibe));
      }

      if (pathname === '/api/v1/posts' && method === 'POST') {
        const body = await parseBody(req);
        return sendJson(res, 201, postCtrl.createPost(body));
      }

      // Dynamic Post Actions: /api/v1/posts/:id/(like|save|echo-shift|comments)
      const postActionMatch = pathname.match(/^\/api\/v1\/posts\/([^/]+)\/(like|save|echo-shift|comments)$/);
      if (postActionMatch && method === 'POST') {
        const postId = postActionMatch[1];
        const action = postActionMatch[2];

        if (action === 'like') {
          return sendJson(res, 200, postCtrl.toggleLike(postId));
        }
        if (action === 'save') {
          return sendJson(res, 200, postCtrl.toggleSave(postId));
        }
        if (action === 'echo-shift') {
          return sendJson(res, 200, postCtrl.recordEchoShift(postId));
        }
        if (action === 'comments') {
          const body = await parseBody(req);
          return sendJson(res, 201, postCtrl.addComment(postId, body.text || 'Resonance'));
        }
      }

      // 4. Stories
      if (pathname === '/api/v1/stories' && method === 'GET') {
        return sendJson(res, 200, storyCtrl.getStories());
      }
      if (pathname === '/api/v1/stories' && method === 'POST') {
        const body = await parseBody(req);
        return sendJson(res, 201, storyCtrl.createStory(body));
      }

      // 5. Reels
      if (pathname === '/api/v1/reels' && method === 'GET') {
        return sendJson(res, 200, reelCtrl.getReels());
      }
      const reelLikeMatch = pathname.match(/^\/api\/v1\/reels\/([^/]+)\/like$/);
      if (reelLikeMatch && method === 'POST') {
        return sendJson(res, 200, reelCtrl.toggleLikeReel(reelLikeMatch[1]));
      }

      // 6. Direct Messages
      if (pathname === '/api/v1/messages/conversations' && method === 'GET') {
        return sendJson(res, 200, chatCtrl.getConversations());
      }
      if (pathname === '/api/v1/messages/send' && method === 'POST') {
        const body = await parseBody(req);
        return sendJson(res, 201, chatCtrl.sendMessage(body));
      }

      // 7. Users
      if (pathname.startsWith('/api/v1/users/') && method === 'GET') {
        const username = pathname.replace('/api/v1/users/', '');
        return sendJson(res, 200, userCtrl.getUserProfile(username));
      }

      // 404 Route
      sendJson(res, 404, { success: false, message: 'Route not found on AURA protocol' });
    } catch (err) {
      sendJson(res, 500, { success: false, message: err.message || 'Internal Server Error' });
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const fallbackPort = Number(port) + 1;
      console.warn(`Port ${port} is already in use. Retrying on ${fallbackPort}...`);
      startServer(fallbackPort);
      return;
    }

    console.error('Server error:', err);
    process.exit(1);
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`\n🌌 AURA Backend Server active on http://localhost:${port}`);
    console.log(`📡 Health Check: http://localhost:${port}/api/health`);
    console.log(`⚡ JavaScript Runtime Engine: Ready\n`);
  });

  return server;
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = startServer(PORT);

export default server;
