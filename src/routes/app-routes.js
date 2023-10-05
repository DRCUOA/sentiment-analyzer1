import express from 'express';
import debug from 'debug';
import { verifyAuthenticated } from '../middleware/auth-middleware.js';
import { upload } from "../config/multer-cofig.js";
import fs from 'fs';
import { tokenize } from '../utils/tokenizer.js';
const router = express.Router();
import csv from 'csv-parser';

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

router.post('/tokenize', upload.single('file'), async (req, res) => {
  console.log(req.file);
  devAppRLog('post /tokenize-text');

  try {
    const results = []; // We'll store the parsed CSV rows here

    // Read and parse the CSV
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        
        // Sanitize and tokenize the parsed data
        const sampleData = results.map(row => {
          const transaction = row.features.toLowerCase();  // sanitization to lowercase
          const tokens = transaction.split(' ');  // tokenization
          const category = row.category_name;
          return { transaction, tokens, category };
        });

        // Remove the uploaded file
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.log("Failed to delete the file:", err);
          } else {
            console.log("Successfully deleted the uploaded file.");
          }
        });

        res.send(sampleData);  // Send the structured data as response
      });

  } catch (err) {
    console.log(err.stack);
    res.send(err.message);
  }
});



router.get('/test-request', function (req, res) {
  res.render('pages/test-request-form')
})

export default router;

// Helper function to sanitize the data
async function sanitizedArray(dataArray) {
  return dataArray.map(tokenize);
};