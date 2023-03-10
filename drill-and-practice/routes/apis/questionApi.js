import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";

const getRandQuestion = async ({ response }) => {
  const randQuestion = await questionService.getRandQuestionAPI();
  if (randQuestion === null) {
    response.body = {};
  } else {
    const questionId = randQuestion.id;
    const optionsData = await answerService.getAnswersByQuestionId(questionId);
    optionsData.forEach((option) => {
      delete option.question_id;
      delete option.is_correct;
      const optionId = option.id;
      delete option.id;
      option.optionId = optionId;
      const optionText = option.option_text;
      delete option.option_text;
      option.optionText = optionText;
    });
    const responseQuestion = {
      questionId: questionId,
      questionText: randQuestion.question_text,
      answeroptions: optionsData,
    };
    response.body = responseQuestion;
  }
};

const checkRandQuestion = async ({ request, response }) => {
  const body = await request.body();
  const questionId = body.value.questionId;
  const optionId = body.value.optionId;
  const correctOptionIds = await answerService.getCorrectOptionIds(questionId);
  const correctOptionIdsArray = correctOptionIds.map((option) => {
    return option.id;
  });
  const correct = correctOptionIdsArray.includes(optionId);
  response.body = { correct: correct };
};

export { getRandQuestion, checkRandQuestion };
