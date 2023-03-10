import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as authController from "./controllers/authController.js";
import * as topicController from "./controllers/topicController.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/auth/login", authController.showLogin);
router.get("/auth/register", authController.showRegister);
router.post("/auth/login", authController.login);
router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);
router.get("/topics/:tId/delete", topicController.deleteTopic);
router.get("/topics/:tId", qu);
export { router };
