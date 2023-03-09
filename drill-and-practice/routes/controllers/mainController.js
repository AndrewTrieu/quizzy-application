import { countTopics } from "../../services/topicService.js";
import { countQuestions } from "../../services/questionService.js";
import { countAnswers } from "../../services/answerService.js";

const showMain = ({ render }) => {
  const statistics = {
    totalTopics: 0,
    totalQuestions: 0,
    totalAnswers: 0,
  };
  statistics.totalTopics = countTopics();
  statistics.totalQuestions = countQuestions();
  statistics.totalAnswers = countAnswers();

  render("main.eta", statistics);
};

export { showMain };
