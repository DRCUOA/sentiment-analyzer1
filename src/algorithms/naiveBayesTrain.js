export function trainModel(trainingDataArray) {
if (!Array.isArray(trainingDataArray)) {
  throw new Error('Training data must be an array');
}

trainingDataArray.forEach(({tokens, category}, index) => {
  if (!Array.isArray(tokens) || typeof category !== 'string') {
    throw new Error(`Invalid data format at index ${index}`);
  }
  let categoryProbabilities = {};
  let tokenProbabilities = {};
  
  const trainModel = (trainingDataArray) => {
    let totalTransactions = 0;
    let categoryCount = {};
    let tokenCount = {};
  
    trainingDataArray.forEach(({tokens, category}) => {
      totalTransactions++;
      
      if (!categoryCount[category]) categoryCount[category] = 0;
      categoryCount[category]++;
  
      tokens.forEach(token => {
        if (!tokenCount[token]) tokenCount[token] = {};
        if (!tokenCount[token][category]) tokenCount[token][category] = 0;
        
        tokenCount[token][category]++;
      });
    });
    
    // Now, let's calculate probabilities
    for (const [category, count] of Object.entries(categoryCount)) {
      categoryProbabilities[category] = count / totalTransactions;
    }   
  
    for (const [token, categories] of Object.entries(tokenCount)) {
      if (!tokenProbabilities[token]) tokenProbabilities[token] = {};
      
      for (const [category, count] of Object.entries(categories)) {
        tokenProbabilities[token][category] = count / categoryCount[category];
      }
    }
  };

});
  return {categoryProbabilities, tokenProbabilities};
}

