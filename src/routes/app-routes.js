import express from 'express';
import debug from 'debug';
import * as categoryController from '../controllers/category/category-controller.js';
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

router.get('/prompt-response', async (req, res) => {
  const prompt = req.query.prompt;
  devAppRLog(`GET /prompt-response with prompt: ${prompt}`);
  const response = await categoryController.getCategorySuggestion(prompt);
  devAppRLog(`Rendering test with response: ${response}`);
  res.render('pages/test', { response });
});

export default router;
