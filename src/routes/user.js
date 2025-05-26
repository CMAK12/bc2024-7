const express = require('express');
const pool = require('../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const result = await pool.query(
    'INSERT INTO users (name) VALUES ($1) RETURNING *',
    [name]
  );
  res.status(201).json(result.rows[0]);
});

module.exports = router;
