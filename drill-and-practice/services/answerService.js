import { sql } from "../database/database.js";

const countAnswers = async () => {
  const result = await sql`SELECT COUNT(id) FROM question_answer_options`;
  return result[0].count;
};

const getAnswersByQuestionId = async (questionId) => {
  const result =
    await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
  return result;
};

const addAnswer = async (questionId, optionText, isCorrect) => {
  await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${questionId}, ${optionText}, ${isCorrect})`;
};

const deleteAnswer = async (questionId, optionId) => {
  await sql`DELETE FROM question_answer_options WHERE question_id = ${questionId} AND id = ${optionId}`;
  await sql`DELETE FROM question_answer_options WHERE id = ${optionId}`;
};

const getCorrectOptionIds = async (questionId) => {
  const result =
    await sql`SELECT id FROM question_answer_options WHERE question_id = ${questionId} AND is_correct = true`;
  return result;
};

const getCorrectOptions = async (questionId) => {
  const result =
    await sql`SELECT option_text FROM question_answer_options WHERE question_id = ${questionId} AND is_correct = true`;
  return result;
};

const storeAnswer = async (userId, questionId, optionId) => {
  await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${userId}, ${questionId}, ${optionId})`;
};

export {
  countAnswers,
  getAnswersByQuestionId,
  addAnswer,
  deleteAnswer,
  getCorrectOptionIds,
  getCorrectOptions,
  storeAnswer,
};
