const pool = require('../config/db');
const User = require('../models/user');

async function findUserByName(name) {
  const result = await pool.query('SELECT * FROM users WHERE name = $1', [name]);
  if (result.rows.length === 0) return null;
  return new User(result.rows[0]);
}

async function createUser(name) {
  const result = await pool.query(
    'INSERT INTO users (name) VALUES ($1) RETURNING *',
    [name]
  );
  return new User(result.rows[0]);
}

async function findUserById(id) {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  if (result.rows.length === 0) return null;
  return new User(result.rows[0]);
}


module.exports = {
  findUserById,
  findUserByName,
  createUser,
};
