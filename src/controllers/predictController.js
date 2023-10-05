import { getModelNames } from '../models/predictDaoFile.js';
import { readModelByName } from "../models/naiveBayesDAO.js";

export const renderModelSelectionPage = async (req, res) => {
  try {
    const modelNames = await getModelNames();
    res.render('pages/test-predict-form', { modelNames });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export async function handlePrediction(tokenSets, modelName) {
  try {
    if (!modelName || !tokenSets) {
      throw new Error('Missing required parameters');
    }

    const { categoryProbabilities, tokenProbabilities } = await readModelByName(modelName);
    const predictions = tokenSets.map(tokens => {
      return makePrediction(categoryProbabilities, tokenProbabilities, tokens);
    });
    console.log('Predictions:', predictions);
    return predictions;
  } catch (error) {
    console.error('Error during prediction:', error);
    return { error: 'Internal server error' };
  }
}

function makePrediction(categoryProbabilities, tokenProbabilities, tokens) {
  let maxProbability = 0;
  let predictedCategory = null;
  
  // Loop through each category
  for (const [category, categoryProbability] of Object.entries(categoryProbabilities)) {
    let probability = categoryProbability;

    // Loop through each token in the new data
    for (const token of tokens) {
      if (tokenProbabilities[category] && tokenProbabilities[category][token]) {
        probability *= tokenProbabilities[category][token];
      } else {
        // Handling unseen tokens can be complex. For simplicity, you might choose to ignore them,
        // or assign a very small probability.
        probability *= 0.0001; 
      }
    }

    // Update the predicted category if this category's probability is greater
    // than the max probability encountered so far.
    if (probability > maxProbability) {
      maxProbability = probability;
      predictedCategory = category;
    }
  }

  return predictedCategory;
}
