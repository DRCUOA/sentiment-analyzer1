// tokenizer.js
function tokenize(transactionString) {
  const cleanedString = transactionString.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase();
  const tokens = cleanedString.split(' ');
  return tokens;
}

exports.tokenize;
