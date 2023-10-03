import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();  // Initialize environment variables

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const dbPromise = sqlite.open({ 
  filename: process.env.SQLITE_DB_FILENAME,
  driver: sqlite3.Database
});

export default dbPromise;
