import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as authController from "./controllers/authController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as answerController from "./controllers/answerController.js";
import * as questionApi from "./apis/questionApi.js";

const router = new Router();

// mainController routes (home page)
router.get("/", mainController.showMain);

// authController routes (login and register)
router.get("/auth/login", authController.showLogin);
router.get("/auth/register", authController.showRegister);
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/logout", authController.logout);

// topicController routes (topics)
router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);
router.post("/topics/:tId/delete", topicController.deleteTopic);

// questionController routes (questions)
router.get("/topics/:tId", questionController.listQuestions);
router.get("/topics/:tId/questions/:qId", questionController.showQuestion);
router.post("/topics/:tId/questions", questionController.addQuestion);
router.post(
  "/topics/:tId/questions/:qId/delete",
  questionController.deleteQuestion
);

// answerController routes (answers)
router.post("/topics/:tId/questions/:qId/options", answerController.addAnswer);
router.post(
  "/topics/:tId/questions/:qId/options/:oId/delete",
  answerController.deleteAnswer
);

// questionController routes (quiz)
router.get("/quiz", questionController.listQuizTopics);
router.get("/quiz/:tId", questionController.getRandQuestion);
router.get("/quiz/:tId/questions/:qId", questionController.listQuiz);
router.get("/quiz/:tId/questions/:qId/correct", questionController.showCorrect);
router.get(
  "/quiz/:tId/questions/:qId/incorrect",
  questionController.showIncorrect
);
router.post(
  "/quiz/:tId/questions/:qId/options/:oId",
  questionController.storeAnswer
);

// questionApi routes (API)
router.get("/api/questions/random", questionApi.getRandQuestion);
router.post("/api/questions/answer", questionApi.checkRandQuestion);

export { router };
