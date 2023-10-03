
# Sentiment Analyzer 1

## Overview

This project aims to serve as a learning platform for building a text classifier from the ground up using a Naive Bayes algorithm. Developed in vanilla JavaScript, it specializes in sentiment analysis among other natural language processing (NLP) tasks. This is for the purpose of providing an application protocal interface (API) to act as a service to other applications that need text to classified into given categories.


## Why Vanilla JavaScript?

The application is built using vanilla JavaScript to minimize abstraction layers, thereby aiding developers in understanding the core logic and algorithms.

## Sample Dataset

Here is an example dataset that the application might use for training and testing:

```javascript
let train = [
    {text: 'I love this sandwich.', label: 'pos'},
    {text: 'This is an amazing place!', label: 'pos'},
    {text: 'I feel very good about these beers.', label: 'pos'},
    {text: 'This is my best work.', label: 'pos'},
    {text: 'What an awesome view', label: 'pos'},
    {text: 'I do not like this restaurant', label: 'neg'},
    {text: 'I am tired of this stuff.', label: 'neg'},
    {text: "I can't deal with this", label: 'neg'},
    {text: 'He is my sworn enemy!', label: 'neg'},
    {text: 'My boss is horrible.', label: 'neg'},
    {text: 'I am so excited for the concert.', label: 'pos'},
    {text: 'He is my best friend.', label: 'pos'},
    {text: 'I do not like the taste of this.', label: 'neg'},
    {text: 'I am tired of the noise.', label: 'neg'},
    {text: 'I can’t wait for the weekend.', label: 'pos'},
    {text: 'The food was fantastic.', label: 'pos'},
    {text: 'I am done with my work.', label: 'pos'},
    {text: 'I don’t like doing laundry.', label: 'neg'},
    {text: 'She is so kind and caring.', label: 'pos'},
    {text: 'I am not a fan of this weather.', label: 'neg'}
];

let test = [
    {text: 'The beer was good.', label: 'pos'},
    {text: 'I do not enjoy my job', label: 'neg'},
    {text: "I ain't feeling dandy today.", label: 'neg'},
    {text: 'I feel amazing!', label: 'pos'},
    {text: 'Gary is a friend of mine.', label: 'pos'},
    {text: "I can't believe I'm doing this.", label: 'neg'},
    {text: 'I really like this new design.', label: 'pos'},
    {text: 'My teammates are great.', label: 'pos'},
    {text: 'I dislike being stuck in traffic.', label: 'neg'},
    {text: 'He is so talented.', label: 'pos'},
    {text: 'I hate having to wake up early.', label: 'neg'},
    {text: 'I am not looking forward to the meeting.', label: 'neg'},
    {text: 'She is my favorite artist.', label: 'pos'},
    {text: 'I am so grateful for my family.', label: 'pos'},
    {text: 'I cannot stand the taste of broccoli.', label: 'neg'},
    {text: 'The concert was so much fun.', label: 'pos'},
    {text: 'I am dreading the exam.', label: 'neg'},
    {text: 'I cannot wait to see you.', label: 'pos'},
    {text: 'I am not ready for winter.', label: 'neg'},
    {text: 'He is such a good person.', label: 'pos'}
];
```

## Dependencies

The following npm packages are used:
| Dependency           | Purpose                              | Version       |
|----------------------|-------------------------------------------|--------------|
| axios                | HTTP client for browser and Node.js        | ^1.3.2       |
| bcrypt               | Library for hashing and salting passwords  | ^5.1.1       |
| cheerio              | Implementation of core jQuery for the server | ^1.0.0-rc.12 |
| cookie-parser        | Middleware for parsing cookies            | ^1.4.6       |
| crypto               | Native Node.js module for cryptography    | ^1.0.1       |
| debug                | Utility for logging debug information     | ^4.3.4       |
| dotenv               | Loads environment variables from a .env file | ^16.0.3     |
| express              | Web framework for Node.js                 | ^4.18.2      |
| express-handlebars   | Handlebars view engine for Express        | ^7.1.2       |
| joi                  | Object schema validation                  | ^17.7.0      |
| jsonwebtoken         | JWT (JSON Web Token) implementation       | ^9.0.0       |
| knex                 | SQL query builder                         | ^2.5.1       |
| luxon                | Library for date and time manipulation    | ^3.3.0       |
| morgan               | HTTP request logger middleware            | ^1.10.0      |
| multer               | Middleware for handling `multipart/form-data` | ^1.4.5-lts.1 |
| nodemailer           | Module for sending emails                 | ^6.9.1       |
| openai               | OpenAI API wrapper                        | ^4.11.0      |
| quagga               | Library for barcode-scanning              | ^0.6.16      |
| sql-template-strings | SQL template string handler               | ^2.2.2       |
| sqlite3              | SQLite3 driver for Node.js                | ^5.1.4       |
| uuid                 | Generates unique identifiers              | ^9.0.0       |
| chai                 | Assertion library for testing             | ^4.3.8       |
| chai-http            | HTTP integration testing for Chai         | ^4.4.0       |
| chance               | Random generator helper for testing       | ^1.1.11      |
| csv-parser           | CSV parsing utility                       | ^3.0.0       |
| eslint               | Code linting tool                         | ^8.5.0       |
| jest                 | Testing framework                         | ^29.7.0      |
| jsdoc                | API documentation generator               | ^4.0.2       |
| node-mocks-http      | HTTP mocks for Node.js                    | ^1.13.0      |
| nodemon              | Auto-restarts Node.js server              | ^3.0.1       |
| papaparse            | CSV parser                                | ^5.4.1       |
| prettier             | Code formatter                            | ^3.0.3       |
| sinon                | Test spies, stubs, and mocks              | ^16.0.0      |
| supertest            | HTTP assertions for testing               | ^6.3.3       |


## Project Structure

The project follows a clear directory structure aimed at being intuitive and maintainable.


#### Source Code Structure

| Root Directory      | Application Core | Functional Area   | Specific Files      |
|---------------------|------------------|-------------------|---------------------|
| 📁 sentiment-analyzer1 |                |                   |                     |
|                     | 📁 src            |                   |                     |
|                     |                  | 📁 algorithms      |                     |
|                     |                  |                   | 📄 naiveBayes.js     |
|                     |                  | 📁 data           |                     |
|                     |                  |                   | 📄 train.json       |
|                     |                  |                   | 📄 test.json        |
|                     |                  | 📁 models         |                     |
|                     |                  |                   | 📄 sentimentModel.js |
|                     |                  | 📁 services       |                     |
|                     |                  |                   | 📄 nlpService.js     |
|                     |                  | 📁 utils          |                     |
|                     |                  |                   | 📄 dataHelper.js     |
|                     |                  | 📁 views          |                     |
|                     |                  |                   | 📄 layout.handlebars |
|                     |                  |                   | 📄 index.handlebars  |
|                     |                  | 📁 controllers    |                     |
|                     |                  |                   | 📄 sentimentController.js |
|                     | 📁 test           |                   |                     |
|                     |                  | 📁 unit           | 📄 ...              |
|                     |                  | 📁 integration    | 📄 ...              |
|                     |                  | 📁 endtoend    | 📄 ...              |
|                     | 📁 docs           | 📄 ...            |                     |
|                     |                   | 📁 static_page_testing           | 📄 ...            |                     
|                     | 📁 node_modules   |                   |                     |
|                     | 📁 public         |                   |                     |
|                     |                  | 📁 css            | 📄 ...              |
|                     |                  | 📁 client-scripts | 📄 ...              |
|                     |                  | 📁 ui-assets      | 📄 ...                      |
|                     | 📄 .gitignore     |                   |                     |
|                     | 📄 package.json   |                   |                     |
|                     | 📄 README.md      |                   |                     |


### Directories, explanations of intended purpose:

| Directory      | Intended Purpose |
|---------------------|--------------------------------------------|
| 📁 src              | Core application logic                     |
| 📁 algorithms       | Algorithms like Naive Bayes                |
| 📁 data             | Training and testing datasets              |
| 📁 models           | Data models like sentiment analysis        |
| 📁 services         | NLP and other utility services             |
| 📁 utils            | Helper functions                           |
| 📁 views            | Handlebars templates for UI                |
| 📁 controllers      | Manages data flow between Model and View   |
| 📁 test             | Unit and integration tests                 |
| 📁 docs             | Documentation                              |
| 📁 public           | Static files for the front end             |
| 📄 .gitignore       | Files and directories to ignore            |
| 📄 package.json     | npm configuration                          |
| 📄 README.md        | This file                                  |

### MVC Design Pattern

The project adheres to the Model-View-Controller (MVC) design pattern:

- **Model**: Encapsulates the data logic (located in `models/`).
- **View**: Holds the templates for UI rendering (located in `views/`).
- **Controller**: Manages data flow (located in `controllers/`).


## Wireframe

### User features list

1. Register a new account to be issued an api-key to use the service
2. Set-up new classification service
    1.  Add test data
    2.  Add training data
    3.  Configure 

3. Use existing classification services by sending strings and receiving the string and it's classification back

4. Edit existing services
    1.  Add test data
    2.  Add training data
    3.  Configure 

### Service Example

Analyse a provided string for best fit to a single category.  

Example data set for this service : 

Sample category-list : 
``` json
[
    {
        "category_description": "Monthly car payments",
        "category_frequency_id": 2,
        "category_group_id": 4,
        "category_id": "1",
        "category_keywords": "mtf, 00212368735, Mtf Payment",
        "category_name": "Car Lease",
        "category_type_id": 2
    },
    {
        "category_description": "Monthly auto insurance premiums",
        "category_frequency_id": 2,
        "category_group_id": 4,
        "category_id": "2",
        "category_keywords": "Cove",
        "category_name": "Car insurance",
        "category_type_id": 2
    },
    {
        "category_description": "Monthly expenses for petrol",
        "category_frequency_id": 5,
        "category_group_id": 4,
        "category_id": "3",
        "category_keywords": "Gull",
        "category_name": "Petrol",
        "category_type_id": 2
    },
    {
        "category_description": "Irregular expense for car maintenance",
        "category_frequency_id": 5,
        "category_group_id": 4,
        "category_id": "4",
        "category_keywords": "",
        "category_name": "Car Servicing",
        "category_type_id": 2
    },
    {
        "category_description": "Monthly expenses for public transportation",
        "category_frequency_id": 2,
        "category_group_id": 4,
        "category_id": "5",
        "category_keywords": "At Hop",
        "category_name": "Public Transport",
        "category_type_id": 2
    },
    {
        "category_description": "Monthly insurance premiums",
        "category_frequency_id": 2,
        "category_group_id": 5,
        "category_id": "6",
        "category_keywords": "Southern Cross, AIA, Aianz",
        "category_name": "Health and Life Insurance",
        "category_type_id": 2
    },
    {
        "category_description": "Irregular out-of-pocket costs",
        "category_frequency_id": 5,
        "category_group_id": 7,
        "category_id": "7",
        "category_keywords": "Snapfish, Mister Minit, Cafe, 094209",
        "category_name": "Out-of-pocket expenses",
        "category_type_id": 1
    },
    {
        "category_description": "Monthly expenses for prescriptions",
        "category_frequency_id": 2,
        "category_group_id": 5,
        "category_id": "8",
        "category_keywords": "Unichem, Auckland Surgical As, Northcross Pharmacy, Chemist, Waitemata Endoscopy, Ella Smits, The Heart Group, Molemap, Mr Booth, Micaela Goldsmith, Milford Nutritional Pharmacy,  Milford Nutritional, Takapuna Health, Dodson Medical, Sp Bnmulti, Cw Albany, Cw Milford, Milford Nutritional, Jc Med Expen",
        "category_name": "Medical Expenses",
        "category_type_id": 2
    },
    {
        "category_description": "Mobile phone bill",
        "category_frequency_id": 2,
        "category_group_id": 2,
        "category_id": "9",
        "category_keywords": "One NZ, 401969784",
        "category_name": "Mobile Phone",
        "category_type_id": 2
    },
    {
        "category_description": "Monthly contributions to investment accounts",
        "category_frequency_id": 2,
        "category_group_id": 6,
        "category_id": "10",
        "category_keywords": "Holla, Animates, Nvc",
        "category_name": "Pet Expenses",
        "category_type_id": 2
    },
    {
        "category_description": "Monthly deposits to basic savings accounts",
        "category_frequency_id": 2,
        "category_group_id": 6,
        "category_id": "11",
        "category_keywords": null,
        "category_name": "Long Term Savings",
        "category_type_id": 1
    }]
```
Note: 
- label = assigned category
- text = string input

``` javascript
let train = [
    {text: 'Gully Funny Bob', label: 'Petrol'},
    {text: 'Cw Albany              Albany        Nz ', label: 'Medical Expenses'},
    {text: 'Milford Nutritional    Milford       Nz ', label: 'Medical Expenses'},
    {text: 'The Warehouse 201      Milford       Nz ', label: 'Clothing'},
    {text: 'Chemist Warehouse Nz O Auckland      Nz ', label: 'Medical Expenses'},
    {text: 'Briscoes Albany        Albany        Nz ', label: 'Homewares and Maintenance'}
];

let test = [
    {text: 'nan', label: 'Unknown'},
    {text: 'New World Long Bay     Auckland      Nz ', label: 'Groceries'},
    {text: 'Fish Monger', label: 'Unknown'},
    {text: 'Mighty Ape Limited     Millwater     Nz ', label: 'Homewares and Maintenance'},
    {text: 'Mitre 10 Albany        Auckland      Nz ', label: 'Homewares and Maintenance'}
];
```

# Example Implementation
## Naive Bayes Classifier for Bank Transactions in Vanilla JavaScript

### Introduction

This project aims to implement a Naive Bayes classifier in Vanilla JavaScript for categorizing bank transactions. The classifier uses the Bayes' Theorem and assumes that all tokens in a transaction string are independent of each other.

### Steps to Follow

#### Step 1: Data Collection and Preprocessing

##### 1. Collect Sample Data
Create an array of sample transactions and their associated categories.

```javascript
const sampleData = [
  { transaction: "grocery store food", category: "Shopping" },
  { transaction: "salary", category: "Income" },
  // ... more samples
];
```

##### 2. Tokenize
Split the transaction strings into tokens (words or other meaningful units).

##### 3. Sanitize
Remove any irrelevant characters and convert all tokens to lowercase.

```javascript
const tokenize = (str) => str.toLowerCase().split(' ');
```

#### Step 2: Training the Model

##### 1. Calculate Prior Probabilities
For each category, calculate the prior probability \( P(\text{Category}) \).

##### 2. Calculate Token Probabilities
For each token, calculate the conditional probability \( P(\text{Token} | \text{Category}) \) for each category.

```javascript
// Initialize variables to hold your calculations
let categoryProbabilities = {};
let tokenProbabilities = {};
// Your training function will populate these
```

#### Step 3: Making Predictions

##### 1. Tokenize Input
Tokenize the new transaction string.

##### 2. Calculate Probabilities
For each category, calculate \( P(\text{Category} | \text{Transaction}) \) using Bayes' Theorem.

##### 3. Select Best Fit
Choose the category with the highest probability.

```javascript
const predictCategory = (transaction) => {
  // Tokenize and sanitize the input
  const tokens = tokenize(transaction);
  // Perform prediction using Bayes' Theorem
  // You will be using categoryProbabilities and tokenProbabilities here
  // Return the category with the highest probability
};
```

#### Step 4: Evaluating the Model

##### 1. Confusion Matrix
Create a simple confusion matrix to evaluate the performance of your classifier.

##### 2. Tune
Adjust your model based on the evaluation.

### Constructive Points

1. **Variable Naming**: Given dyslexia, take extra care in naming your variables clearly. Maybe even add comments to elaborate what each does.
2. **Math Challenges**: If you're not great at math, the probability calculations could be tricky. Double-check your math, and maybe run it by a calculator or a friend proficient in math.
3. **Debugging**: Start with a very small dataset and manually calculate probabilities to ensure your code is working as expected.


