import SQL from 'sql-template-strings';
import dbPromise from '../config/sqlite-db-config.js';

// Save or Update Model Probabilities
export const saveOrUpdateModelProbabilities = async (model_name, categoryProbabilities, tokenProbabilities) => {
  const db = await dbPromise;
  
  // Insert or Update Category probabilities
  for (const [category, probability] of Object.entries(categoryProbabilities)) {
    await db.run(SQL`
      INSERT OR REPLACE INTO CategoryProbabilities (category, probability, model_name)
      VALUES (${category}, ${probability}, ${model_name})
    `);
  }

  // Insert or Update Token probabilities
  for (const [token, categories] of Object.entries(tokenProbabilities)) {
    for (const [category, probability] of Object.entries(categories)) {
      await db.run(SQL`
        INSERT OR REPLACE INTO TokenProbabilities (token, category, probability)
        VALUES (${token}, ${category}, ${probability})
      `);
    }
  }
};


// Read model by name
export const readModelByName = async (model_name) => {
  const db = await dbPromise;
  const categoryProbabilities = {};
  const tokenProbabilities = {};

  // Fetch categories based on model_name
  const categoryRows = await db.all(SQL`SELECT * FROM CategoryProbabilities WHERE model_name = ${model_name}`);
  categoryRows.forEach(row => {
    categoryProbabilities[row.category] = row.probability;
  });

  // Fetch tokens based on categories related to the given model_name
  const tokenRows = await db.all(SQL`
    SELECT * FROM TokenProbabilities 
    WHERE category IN (SELECT category FROM CategoryProbabilities WHERE model_name = ${model_name})
  `);
  tokenRows.forEach(row => {
    if (!tokenProbabilities[row.token]) {
      tokenProbabilities[row.token] = {};
    }
    tokenProbabilities[row.token][row.category] = row.probability;
  });

  return { categoryProbabilities, tokenProbabilities };
};

// Delete model by name
export const deleteModelByName = async (model_name) => {
  const db = await dbPromise;

  await db.run(SQL`DELETE FROM CategoryProbabilities WHERE model_name = ${model_name}`);
  await db.run(SQL`DELETE FROM TokenProbabilities WHERE category NOT IN (SELECT category FROM CategoryProbabilities)`);
};
