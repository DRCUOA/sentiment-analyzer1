/** @param {Array} trainingDataArray - Array of objects
 * @description - This function will train the model based on the training data
 * @returns {Object} - Returns an object with two properties
 * 1. categoryProbabilities - Object with category as key and probability as value
 * 2. tokenProbabilities - Object with token as key and probability as value 
 * **/

let categoryProbabilities = {};
let tokenProbabilities = {};

export function trainModel(trainingDataArray) {
  // Data validation
  if (!Array.isArray(trainingDataArray)) {
    throw new Error('Training data must be an array');
  }

  trainingDataArray.forEach(({ tokens, category }, index) => {
    if (!Array.isArray(tokens) || typeof category !== 'string') {
      throw new Error(`Invalid data format at index ${index}`);
    }
  });

  let totalTransactions = 0;
  let categoryCount = {};
  let tokenCount = {};

  // Your main logic for training
  trainingDataArray.forEach(({ tokens, category }) => {
    totalTransactions++;

    if (!categoryCount[category]) categoryCount[category] = 0;
    categoryCount[category]++;

    tokens.forEach(token => {
      if (!tokenCount[token]) tokenCount[token] = {};
      if (!tokenCount[token][category]) tokenCount[token][category] = 0;

      tokenCount[token][category]++;
    });
  });

  // Calculating probabilities
  for (const [category, count] of Object.entries(categoryCount)) {
    categoryProbabilities[category] = count / totalTransactions;
  }

  for (const [token, categories] of Object.entries(tokenCount)) {
    if (!tokenProbabilities[token]) tokenProbabilities[token] = {};

    for (const [category, count] of Object.entries(categories)) {
      tokenProbabilities[token][category] = count / categoryCount[category];
    }
  }

  return { categoryProbabilities, tokenProbabilities };
}
