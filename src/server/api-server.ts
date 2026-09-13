import http from 'http';
import { handleLearningApiRequest, sendJson } from './api-handler';

export function createApiServer() {
  return http.createServer(async (req, res) => {
    try {
      const handled = await handleLearningApiRequest(req, res);
      if (!handled) {
        sendJson(res, 404, {
          success: false,
          error: `Endpoint not found: ${req.method} ${req.url}`,
          code: 'NOT_FOUND'
        });
      }
    } catch (err: any) {
      console.error('Unhandled API Server error:', err);
      sendJson(res, 500, {
        success: false,
        error: 'Internal server error',
        code: 'INTERNAL_ERROR'
      });
    }
  });
}

export const server = createApiServer();

// Start listening only when executed directly as CLI script
const isDirectRun = process.argv[1] && (process.argv[1].endsWith('api-server.ts') || process.argv[1].endsWith('api-server.js'));
if (isDirectRun) {
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
  server.listen(PORT, () => {
    console.log(`🚀 DeutschQuest Learning API Server running at http://localhost:${PORT}/`);
    console.log(`   - POST /api/learning/evaluate`);
    console.log(`   - POST /api/learning/submit-lesson`);
    console.log(`   - GET  /api/learning/mastery/:userId`);
    console.log(`   - POST /api/learning/mastery/update`);
    console.log(`   - GET  /api/learning/spaced-review/:userId`);
    console.log(`   - GET  /api/health`);
  });
}
