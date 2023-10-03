/* * * * * * * * * * * * * * * * * * * * *\ 
 *                                        *
 *        >>> Sentiment Analyzer   <<<    * 
 *                  API                   *
 *      >>>      V0.0.1       <<<         *  
 *        >>> Alpha Version <<<           * 
 *                                        *         
 *                   Author:Richard Clark *
 *                            Licence:MIT *
 *               Copyright:nzwebapps 2023 *
 *                                        *      
 *         ALL RIGHTS RESERVED            *
 *                                        *
 * * * * * * * * * * * * * * * * * * * * */

// Setup express server, app, and port variables
import express from 'express';
import { config as dotenvConfig } from 'dotenv';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import morgan from 'morgan';
import debug from 'debug';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { toaster } from './src/services/toaster.js';
import { addUserToLocals, verifyAuthenticated } from './src/middleware/auth-middleware.js';
import mainRouter from './src/routes/routes-index.js';
import dbConfig from './src/config/sqlite-db-config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

// Load environment variables from .env file
dotenvConfig();

// Configure body-parser
app.use(bodyParser.urlencoded({ 
  extended: true, 
  parameterLimit: 50000 
}));
app.use(bodyParser.json());

// Setup view engine
const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: 'src/views/layouts',
  extname: '.handlebars',
  partialsDir: 'src/views/partials',
  helpers: {
    equals: function (a, b) {
      return a === b;
    },
    isIdMatch: function (a, b) {
      return a == b;
    },
    setVar: function (varName, varValue, options) {
      options.data.root[varName] = varValue;
    },
    concat: function (...args) {
      // Remove the last argument which is Handlebars options object
      args.pop();
      // Join the remaining arguments to form a single string
      return args.join('');
    },
    formatCurrency: function(value) {
      return new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD' }).format(value);
    }
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set a different views directory
app.set('views', path.join(__dirname, 'src/views'));

// Setup logging for HTTP requests and debug
const devApp = debug('devLog:app_main');
devApp('devLog enabled');

app.use(morgan('tiny', {
    stream: {
      write: (message) => {
        devApp(message.trim());
      }
    }
  }));

// Set body and cookie parser
app.use(cookieParser());

// Enable URL encoding
app.use(express.urlencoded({ extended: true }));

// Serve static files from a directory named public
app.use(express.static(path.join(__dirname, 'public')));

// Setup middleware for all HTTP requests
app.use(toaster);

// Add user to locals and verify if authenticated
app.use(addUserToLocals);

// Setup index route
app.get('/', verifyAuthenticated, async (req, res) => {
  const dbInUse = (await dbConfig).config.filename;
  console.log(`Using database: ${dbInUse}`);
  res.render('pages/homepage', { layout: 'hero', dbinuse: dbInUse });
});

// Use route index file for all other routes
app.use('/', mainRouter);

// Start the server
app.listen(port, () => {
  devApp(`Server listening on port ${port}\nConnected Database: ${process.env.SQLITE_DB_FILENAME}`);
});

export default app; // for unit testing
