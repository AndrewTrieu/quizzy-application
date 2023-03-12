import { sql } from "../database/database.js";

const addTopic = async (userId, name) => {
  await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name})`;
};

const countTopics = async () => {
  const result = await sql`SELECT COUNT(id) FROM topics`;
  console.log(result[0].count);
  return result[0].count;
};

const getAllTopics = async () => {
  const result = await sql`SELECT * FROM topics ORDER BY name ASC`;
  return result;
};

const getTopicsByUserId = async (userId) => {
  const result =
    await sql`SELECT * FROM topics WHERE user_id = ${userId} ORDER BY name ASC`;
  return result;
};

const getTopicByTopicId = async (topicId) => {
  const result = await sql`SELECT * FROM topics WHERE id = ${topicId}`;
  return result[0];
};

const deleteTopic = async (topicId) => {
  await sql`DELETE FROM topics WHERE id = ${topicId}`;
};

export {
  addTopic,
  countTopics,
  getAllTopics,
  getTopicsByUserId,
  getTopicByTopicId,
  deleteTopic,
};
