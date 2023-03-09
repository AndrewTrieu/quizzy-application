import { sql } from "../database/database.js";

const findUser = async (email) => {
  return await sql`SELECT * FROM users WHERE email = ${email}`;
};

const createUser = async (email, password) => {
  return await sql`INSERT INTO users (email, password) VALUES (${email}, ${password})`;
};

export { findUser, createUser };
