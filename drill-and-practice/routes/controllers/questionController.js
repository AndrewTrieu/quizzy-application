import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
  question: [validasaur.required, validasaur.minLength(1)],
};

const addQuestion = async ({ request, response, params, state, render }) => {
  const topicId = params.tId;
  const userId = (await state.session.get("user")).id;
  const body = request.body({ type: "form" });
  const formData = await body.value;
  const topicName = (await topicService.getTopicByTopicId(topicId)).name;
  const questionData = {
    topicId: topicId,
    topicName: topicName,
    question: formData.get("question"),
  };
  const [passes, errors] = await validasaur.validate(
    questionData,
    validationRules
  );
  if (!passes) {
    response.status = 422;
    questionData.errors = errors;
    questionData.currentQuestions = await questionService.getQuestionsByTopicId(
      topicId
    );
    render("questions.eta", questionData);
  } else {
    await questionService.addQuestion(userId, topicId, questionData.question);
    response.redirect(`/topics/${topicId}`);
  }
};

const listQuestions = async ({ params, render }) => {
  const topicId = params.tId;
  const topicName = (await topicService.getTopicByTopicId(topicId)).name;
  render("questions.eta", {
    topicId: topicId,
    topicName: topicName,
    currentQuestions: await questionService.getQuestionsByTopicId(topicId),
  });
};

const showQuestion = async ({ params, render }) => {
  const questionId = params.qId;
  const questionData = await questionService.getQuestionByQuestionId(
    questionId
  );
  questionData.details = await answerService.getAnswersByQuestionId(questionId);
  questionData.topicId = params.tId;
  render("question.eta", questionData);
};

const deleteQuestion = async ({ params, response }) => {
  const topicId = params.tId;
  const questionId = params.qId;
  await questionService.deleteQuestion(questionId);
  response.redirect(`/topics/${topicId}`);
};

const listQuiz = async ({ params, render }) => {
  const topicId = params.tId;
  const questionId = params.qId;
  const questionData = await questionService.getQuestionByQuestionId(
    questionId
  );
  const quizData = {
    topicId: topicId,
    questionId: questionId,
    question: questionData.question_text,
    answers: await answerService.getAnswersByQuestionId(questionId),
  };
  render("quiz.eta", quizData);
};

const getRandQuestion = async ({ params, response }) => {
  const topicId = params.tId;
  const randQuestion = await questionService.getRandQuestion(topicId);
  if (randQuestion === null) {
    response.body = "No questions in this topic!";
  } else {
    response.redirect(`/quiz/${topicId}/questions/${randQuestion.id}`);
  }
};

const listQuizTopics = async ({ render }) => {
  render("quizTopics.eta", {
    topics: await topicService.getAllTopics(),
  });
};

const storeAnswer = async ({ response, params, state }) => {
  const topicId = params.tId;
  const questionId = params.qId;
  const optionId = params.oId;
  const userId = (await state.session.get("user")).id;
  const correctOptionIds = (
    await answerService.getCorrectOptionIds(questionId)
  ).map((obj) => obj.id);
  console.log(correctOptionIds);
  const correct = correctOptionIds.includes(Number(optionId));
  await answerService.storeAnswer(userId, questionId, optionId);
  if (correct) {
    response.redirect(`/quiz/${topicId}/questions/${questionId}/correct`);
  } else {
    response.redirect(`/quiz/${topicId}/questions/${questionId}/incorrect`);
  }
};

const showCorrect = async ({ params, render }) => {
  render("correct.eta", { tId: params.tId });
};

const showIncorrect = async ({ params, render }) => {
  const questionId = params.qId;
  const correctOptions = {
    data: await answerService.getCorrectOptions(questionId),
    tId: params.tId,
  };
  console.log(correctOptions);
  render("incorrect.eta", correctOptions);
};

export {
  addQuestion,
  listQuestions,
  showQuestion,
  deleteQuestion,
  listQuiz,
  getRandQuestion,
  listQuizTopics,
  storeAnswer,
  showCorrect,
  showIncorrect,
};
