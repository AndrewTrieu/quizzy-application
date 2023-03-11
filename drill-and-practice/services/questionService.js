import { sql } from "../database/database.js";

const countQuestions = async () => {
  const result = await sql`SELECT COUNT(id) FROM questions`;
  return result[0].count;
};

const getQuestionsByTopicId = async (topicId) => {
  const result = await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
  return result;
};

const getQuestionByQuestionId = async (questionId) => {
  const result = await sql`SELECT * FROM questions WHERE id = ${questionId}`;
  return result[0];
};

const addQuestion = async (userId, topicId, question) => {
  await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${userId}, ${topicId}, ${question})`;
};

const deleteQuestion = async (questionId) => {
  await sql`DELETE FROM questions WHERE id = ${questionId}`;
};

const getRandQuestion = async (topicId) => {
  const result =
    await sql`SELECT * FROM questions WHERE topic_id = ${topicId} ORDER BY RANDOM() LIMIT 1`;
  if (result.length === 0) {
    return null;
  }
  return result[0];
};

const getRandQuestionAPI = async () => {
  const result = await sql`SELECT * FROM questions ORDER BY RANDOM() LIMIT 1`;
  if (result.length === 0) {
    return null;
  }
  return result[0];
};

export {
  countQuestions,
  getQuestionsByTopicId,
  getQuestionByQuestionId,
  addQuestion,
  deleteQuestion,
  getRandQuestion,
  getRandQuestionAPI,
};
