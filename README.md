# Quizzy Application

## Overview

This is a web application that is used for repeated practice of learned content. The application provides a list of topics and allows creating multiple-choice questions into those topics that are then answered by self and others. The application also shows basic statistics: the total number of available questions and the total number of question answers. In addition, the application also provides an API for retrieving and answering random questions.

PostgreSQL is used as a database for storing topics, questions, and answers. The database is managed using Flyway. The application is written in JavaScript using the Deno runtime. The application is deployed using Fly.io and can be accessed at <https://quizzy.fly.dev>.

## Usage

To access the functionality of the application, you need to create an account. After that, you can create topics and questions. The application provides a list of topics and allows creating multiple-choice questions into those topics that are then answered by self and others. Start answering questions by clicking on the "Quiz" button on the top right corner of the page.

**To access admin mode, please use email ***admin@admin.com*** and password ***123456***.**

## API

The application provides an API for retrieving and answering random questions. The API is available at <https://quizzy.fly.dev/api/questions/random>. To verify your answer, you need to provide the question ID and the answer ID in the request body, for example:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"questionId": 1, "answerId": 1}' https://quizzy.fly.dev/api/questions/answer
```

The API will return a JSON object with `correct`: a boolean value indicating whether the answer is correct or not.

## File Structure

```bash
.
├── docker-compose.yml
├── drill-and-practice
│   ├── app.js
│   ├── app-launch.js
│   ├── database
│   │   └── database.js
│   ├── deps.js
│   ├── Dockerfile
│   ├── fly.toml
│   ├── middlewares
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── renderMiddleware.js
│   │   ├── serveStaticMiddleware.js
│   │   └── userMiddleware.js
│   ├── routes
│   │   ├── apis
│   │   │   └── questionApi.js
│   │   ├── controllers
│   │   │   ├── answerController.js
│   │   │   ├── authController.js
│   │   │   ├── mainController.js
│   │   │   ├── questionController.js
│   │   │   └── topicController.js
│   │   └── routes.js
│   ├── services
│   │   ├── answerService.js
│   │   ├── authService.js
│   │   ├── questionService.js
│   │   └── topicService.js
│   ├── tests
│   │   └── app_test.js
│   └── views
│       ├── correct.eta
│       ├── incorrect.eta
│       ├── layouts
│       │   └── layout.eta
│       ├── login.eta
│       ├── main.eta
│       ├── question.eta
│       ├── questions.eta
│       ├── quiz.eta
│       ├── quizTopics.eta
│       ├── register.eta
│       └── topics.eta
├── e2e-playwright
│   ├── Dockerfile
│   ├── package.json
│   ├── playwright.config.js
│   └── tests
│       └── hello-world.spec.js
├── flyway
│   └── sql
│       └── V1___initial_schema.sql
├── project.env
└── README.md
```

## Testing

The application is tested using Playwright. The tests are located in the `e2e-playwright` directory. To run the tests, you need to have Docker installed. Then, run the following command:

```bash
docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf
```

## Local Development

To run the application locally, you need to have Docker installed. Then, run the following command:

```bash
docker-compose up
```
