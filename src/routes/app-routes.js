import express from 'express';
import debug from 'debug';
import { verifyAuthenticated } from '../middleware/auth-middleware.js';
import { upload } from "../config/multer-cofig.js";
import fs from 'fs';
import { tokenize } from '../utils/tokenizer.js';
const router = express.Router();
import csv from 'csv-parser';
import * as naiveBayesController from "../controllers/naiveBayesController.js";
import * as naiveBayesPredictController from '../controllers/predictController.js';

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
  const modelName = req.body.model_name;

  try {
    const message = await new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            // Sanitize and tokenize the parsed data
            const sampleData = results.map(row => {
              const transaction = row.features.toLowerCase();  // sanitization to lowercase
              const tokens = transaction.split(' ');  // tokenization
              const category = row.category_name;
              return { transaction, tokens, category };
            });

            // Your existing logic to send the sanitized and tokenized data to the controller
            const message = await naiveBayesController.handleTraining(sampleData, modelName);

            // Resolve the promise
            resolve(message);

            // Remove the uploaded file
            fs.unlink(req.file.path, (err) => {
              if (err) {
                console.log("Failed to delete the file:", err);
              } else {
                console.log("Successfully deleted the uploaded file.");
              }
            });

          } catch (error) {
            // Reject the promise
            reject(error);

            // It's wise to also remove the file in case of an error to avoid clutter
            fs.unlink(req.file.path, (err) => {
              if (err) {
                console.log("Failed to delete the file:", err);
              } else {
                console.log("Successfully deleted the uploaded file.");
              }
            });
          }
        });
    });

    console.log(message);
    res.render('pages/homepage', { message: message });

  } catch (err) {
    console.log(err.stack);
    res.send(err.message);
  }
});

router.post('/make-prediction', upload.single('file'), async (req, res) => {
  console.log(req.file);
  devAppRLog('post /make-prediction');
  const modelName = req.body.model_name;
  console.log('model name: ', modelName);
  try {
    const message = await new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            const inputData = results.map(row => {
              const combinedFields = [row.Details, row.Code, row.Particulars, row.Reference]
                .filter(field => field)
                .join(" ")
                .toLowerCase();
              const tokens = tokenize(combinedFields);
              return { tokens };
            });
        
            const predictions = await naiveBayesPredictController.handlePrediction(inputData.map(data => data.tokens), modelName);
        
            // Resolve the promise
            resolve(predictions);

          } catch (error) {
            // Reject the promise
            reject(error);
            // Remove the file in case of error
            fs.unlink(req.file.path, (err) => {
              if (err) {
                console.log("Failed to delete the file:", err);
              } else {
                console.log("Successfully deleted the uploaded file.");
              }
            });
          }
        });
    });

    console.log(message);
    res.render('pages/homepage', { message: message });

  } catch (err) {
    console.log(err.stack);
    res.send(err.message);
  }
});


router.get('/test-request', function (req, res) {
  res.render('pages/test-request-form')
})

// src/routes/yourRoutesFile.js

router.get('/selectModel', naiveBayesPredictController.renderModelSelectionPage);


export default router;

// Helper function to sanitize the data
async function sanitizedArray(dataArray) {
  return dataArray.map(tokenize);
};