// predictDaoFile.js
import SQL from 'sql-template-strings';
import dbPromise from '../config/sqlite-db-config.js';

export const getModelNames = async () => {
  const db = await dbPromise;
  const rows = await db.all(SQL`SELECT DISTINCT model_name FROM CategoryProbabilities`);
  return rows.map(row => row.model_name);
};
