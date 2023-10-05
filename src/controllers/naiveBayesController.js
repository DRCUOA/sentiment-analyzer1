import { trainModel } from '../algorithms/naiveBayesTrain.js';
import * as trainedModelDAO from "../models/naiveBayesDAO.js";

// Function in your controller to handle training
export async function handleTraining(sampleData, modelName) {
  try {
    const { categoryProbabilities, tokenProbabilities } = trainModel(sampleData);
    // Use the DAO function to save the probabilities
    await trainedModelDAO.saveOrUpdateModelProbabilities(modelName, categoryProbabilities, tokenProbabilities);
    // Send a success response
    let message = `Model ${modelName} trained successfully`;
    return message;
  } catch (err) {
    console.error('Error in training the model:', err.stack);
    return ({
      message: 'Internal Server Error',
    });
  }
}