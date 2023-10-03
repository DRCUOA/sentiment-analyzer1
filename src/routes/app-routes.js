import express from 'express';
import debug from 'debug';
import { verifyAuthenticated } from '../middleware/auth-middleware.js';
import { tokenize } from '../utils/tokenizer.js';
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

router.post('/tokenize', async (req, res) => {
  devAppRLog('post /tokenize-text')
  try {
      const str = req.body.strings
      const response = await tokenize(str)
      res.send(response);
  } catch (err) {
    console.log(err.stack)
    res.send(err.message)
  }
})

router.get('/test-request', function (req, res) {
  res.render('pages/test-request-form')
})

export default router;
