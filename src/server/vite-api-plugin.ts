import { Plugin } from 'vite';
import { handleLearningApiRequest } from './api-handler';

export function learningApiPlugin(): Plugin {
  return {
    name: 'deutsch-quest-learning-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          try {
            const handled = await handleLearningApiRequest(req, res);
            if (handled) return;
          } catch (err) {
            console.error('API Plugin middleware error:', err);
          }
        }
        next();
      });
    }
  };
}
