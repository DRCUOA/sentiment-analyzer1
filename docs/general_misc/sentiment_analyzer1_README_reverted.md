
# Sentiment Analyzer 1

## Overview

This project aims to serve as a learning platform for building a text classifier from the ground up using a Naive Bayes algorithm. Developed in vanilla JavaScript, it specializes in sentiment analysis among other natural language processing (NLP) tasks.

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
| 📁 sentiment-analyzer1 |                  |                   |                     |
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
|                     |                  | 📄 index.js       |                     |
|                     | 📁 test           |                   |                     |
|                     |                  | 📁 unit           | 📄 ...              |
|                     |                  | 📁 integration    | 📄 ...              |
|                     | 📁 docs           | 📄 ...            |                     |
|                     | 📁 node_modules   |                   |                     |
|                     | 📁 public         |                   |                     |
|                     |                  | 📁 css            | 📄 ...              |
|                     |                  | 📁 js             | 📄 ...              |
|                     |                  | 📄 index.html     |                     |
|                     | 📄 .gitignore     |                   |                     |
|                     | 📄 package.json   |                   |                     |
|                     | 📄 README.md      |                   |                     |
                                |

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

1. **Relevance of MVC**:
   - MVC continues to be a significant design pattern due to its structured approach, promoting a separation of concerns which organizes code into three interconnected components: Model, View, and Controller. This pattern is particularly beneficial in team environments and projects where a clear separation between data, presentation, and actions on data is necessary. However, alternative patterns like MVVM and MVI have emerged to address some of MVC's limitations.

2. **Criticisms of MVC**:
   - Critics argue that MVC can introduce complexity, pose scalability issues, and sometimes performance overheads, especially in simpler or high-performance-required projects. The rigidity of MVC can also potentially stifle innovative problem-solving approaches. Furthermore, while MVC aids in organizing code within an application, it may not align well with modern development trends like microservices, serverless computing, or reactive programming.

3. **MVC in Microservices Context**:
   - Transitioning to microservices has been a trend to create scalable, maintainable, and resilient systems. It's possible to implement microservices within an MVC framework, with each microservice following the MVC pattern internally. However, microservices allow for more flexibility at the system level, independent scaling of services, and a polyglot technology stack, contrasting with the monolithic deployment nature of traditional MVC architectures.


In this project, we have an outline for a structured approach adhering to the MVC design pattern to build a text classifier using vanilla JavaScript. 

The objective is to keep abstractions to a minimum, to allow for core learning on basic principles, namely the Naive Bayes algorithm for sentiment analysis. The project structure is based on separating different concerns into distinct directories and following the MVC pattern.

To consider building like a micro-service but using the MVC pattern, it's about achieving a level of modularity, scalability, and maintainability similar to what microservices architecture offers. Here are some insights:

1. **Modular Design**:
   - Keep the design modular. Each functional area, such as the algorithmic part, data handling, or NLP services, could be developed as semi-independent modules within the MVC framework. This modular approach will mimic the independence of microservices.

2. **Stateless Controllers**:
   - Ensure that your controllers are stateless, much like microservices. This will help in handling requests in an isolated manner, improving scalability and maintainability.

3. **API-first Approach**:
   - Develop an API for the interactions between different parts of your application. This way, you create a clear contract between different modules, similar to how microservices interact.

4. **Independent Deployment**:
   - Although it might not be possible to deploy individual MVC components independently like microservices, strive for a level of independence in deployment. For example, ensure that changes to one module won’t necessitate changes to other modules.

5. **Centralized Configuration**:
   - Employ centralized configuration management to ease the process of changing configurations across different modules, akin to a microservices environment.

6. **Scalable Data Management**:
   - Your data management should be scalable. Consider employing strategies that would allow for the easy scaling of your data layer, similar to how microservices can independently scale.

7. **Monitoring and Logging**:
   - Implement robust monitoring and logging across all modules, ensuring traceability and observability, which are crucial in a microservices architecture.

8. **Automated Testing and CI/CD**:
   - Adopt a robust strategy for automated testing and continuous integration/continuous deployment (CI/CD) to ensure that each module works as expected independently and within the whole system.

9. **Documentation**:
   - Maintain comprehensive documentation for each module and the system as a whole, ensuring that developers can understand the functionality and interactions of each part of the system.

10. **Learning and Evolution**:
    - As this project serves as a learning platform, encourage the understanding and discussion of microservices principles among developers, and explore how these principles can be applied within an MVC framework.

By applying these insights and keeping the microservices principles of modularity, scalability, and maintainability in mind, you can architect your MVC-based project in a way that approximates the benefits of a microservices architecture, while adhering to the defined MVC pattern and the learning objectives of the project.