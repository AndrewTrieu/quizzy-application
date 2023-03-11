import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
  option: [validasaur.required, validasaur.minLength(1)],
};

const addAnswer = async ({ request, response, params, state, render }) => {
  const topicId = params.tId;
  const questionId = params.qId;
  const userId = (await state.session.get("user")).id;
  const body = request.body({ type: "form" });
  const formData = await body.value;
  const answerData = {
    option: formData.get("option"),
    correct: formData.get("correct"),
  };
  const [passes, errors] = await validasaur.validate(
    answerData,
    validationRules
  );
  const questionData = await questionService.getQuestionByQuestionId(
    questionId
  );
  if (userId !== questionData.user_id) {
    response.status = 403;
    response.body = "You are not the owner of this question!";
    return;
  }
  if (!passes) {
    response.status = 422;
    questionData.errors = errors;
    questionData.option = answerData.option;
    questionData.details = await answerService.getAnswersByQuestionId(
      questionId
    );
    questionData.topicId = topicId;
    render("question.eta", questionData);
  } else {
    const correct = answerData.correct === "on" ? true : false;
    await answerService.addAnswer(questionId, answerData.option, correct);
    response.redirect(`/topics/${topicId}/questions/${questionId}`);
  }
};

const deleteAnswer = async ({ params, response }) => {
  const topicId = params.tId;
  const questionId = params.qId;
  const optionId = params.oId;
  await answerService.deleteAnswer(questionId, optionId);
  response.redirect(`/topics/${topicId}/questions/${questionId}`);
};

export { addAnswer, deleteAnswer };
