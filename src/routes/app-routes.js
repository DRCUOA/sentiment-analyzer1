import express from 'express';
import debug from 'debug';
import { verifyAuthenticated } from '../middleware/auth-middleware.js';
import { upload } from "../config/multer-cofig.js";
import fs from 'fs';
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

router.post('/tokenize', upload.single('file'), async (req, res) => {
  console.log(req.file);
  devAppRLog('post /tokenize-text');

  try {
    //'req.file' contains the uploaded file object
    const fileContents = fs.readFileSync(req.file.path, 'utf8');
    // Split the file contents into an array of rows
    const rows = fileContents.split('\n');
    // parse first row with field names
    const fieldNames = rows[0].split(',');
    // Initialize an array to store the parsed data
    const dataArray = [];
    // Start looping from the second row (index 1) to the end
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(',');
      const rowData = {};
      // Map field names to values for each row
      for (let j = 0; j < fieldNames.length; j++) {
        rowData[fieldNames[j]] = row[j];
      }
      // Push the row data to the dataArray
      dataArray.push(rowData);
    }
    // Extract the strings to tokenize from dataArray
    const stringsToTokenize = dataArray.map((data) => {
      return `${data.features} cateogory::${data.category_name}`;
    });    
    // Tokenize the extracted strings
    const response = stringsToTokenize.map(tokenize);
    // Send the tokens as response
    res.send(response);
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