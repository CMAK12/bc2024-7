const express = require('express');
const pool = require('../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM devices');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { name, serial_number } = req.body;
  const result = await pool.query(
    'INSERT INTO devices (name, serial_number) VALUES ($1, $2) RETURNING *',
    [name, serial_number]
  );
  res.status(201).json(result.rows[0]);
});

module.exports = router;
