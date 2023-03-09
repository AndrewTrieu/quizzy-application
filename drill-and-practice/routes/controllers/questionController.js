import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
  question: [validasaur.required, validasaur.minLength(1)],
};

const addQuestion = async ({ request, response, params, state, render }) => {
    const topicId = params.id;
    const userId (await state.session.get("user")).id;
    const body = request.body({ type: "form-data" });
    const formData = await body.value;
    const questionData = {
        topicId: topicId,
        question: formData.get("question_text"),
    };
    const [passes, errors] = await validasaur.validate(questionData, validationRules);

    if (!passes) {
        response.status = 422;
        questionData.errors = errors;
        questionData.currentQuestionsByTopicId = await questionService.getQuestionsByTopicId(topicId);
        render("questions.eta", questionData);
    } else {
        await questionService.addQuestion(userId, topicId, questionData.question);
        response.redirect(`/topics/${topicId}`);
    }
};

const listQuestions = async ({ params, render, state }) => {
    const topicId = params.id;
    render("questions.eta", {
        topicId: topicId,
        currentQuestions = await questionService.getQuestionsByTopicId(topicId),
    });
};

const showQuestion = async ({ params, render }) => {
    const questionId = params.qId;
    const questionData = await questionService.getQuestionById(questionId);
    questionData.answers = await answerService.getAnswersByQuestionId(questionId);
    questionData.topicId = params.id
    render("question.eta", questionData);
};

const deleteQuestion = async ({ params, response }) => {
    const topicId = params.tId;
    const questionId = params.qId;
    await questionService.deleteQuestion(questionId);
    response.redirect(`/topics/${topicId}`);
};

