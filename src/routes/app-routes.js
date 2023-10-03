import express from 'express';
import debug from 'debug';
import { verifyAuthenticated } from '../middleware/auth-middleware.js';

const router = express.Router();

// Setup dev environment debug namespace
const devAppRLog = debug('devLog:app_routing');

router.get('/admin-home', async (req, res) => {
  const pageDisplayName = "the Setup Hub";
  devAppRLog('GET /admin-home');
  res.render('pages/admin-home', { pageDisplayName });
});

// Setup routes
router.get('/test', async (req, res) => {
  devAppRLog('GET /test');
  res.render('pages/test');
});

export default router;
