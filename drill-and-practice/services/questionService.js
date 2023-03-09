import { sql } from "../database/database.js";

const countQuestions = async () => {
  const result = await sql`SELECT COUNT(id) FROM questions`;
  return result.rows[0].count;
};

const getQuestionsByTopicId = async (topicId) => {
