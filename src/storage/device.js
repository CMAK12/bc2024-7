const pool = require('../config/db');
const Device = require('../models/device');

async function findBySerial(serialNumber) {
  const result = await pool.query('SELECT * FROM devices WHERE serial_number = $1', [serialNumber]);
  if (result.rows.length === 0) return null;
  return new Device(result.rows[0]);
}

async function findAll() {
  const result = await pool.query('SELECT * FROM devices');
  return result.rows.map(row => new Device(row));
}

async function createDevice(name, serialNumber) {
  const result = await pool.query(
    'INSERT INTO devices (name, serial_number) VALUES ($1, $2) RETURNING *',
    [name, serialNumber]
  );
  return new Device(result.rows[0]);
}

async function assignDeviceToUser(serialNumber, userId) {
  await pool.query(
    'UPDATE devices SET user_id = $1 WHERE serial_number = $2',
    [userId, serialNumber]
  );
}

module.exports = {
  findBySerial,
  findAll,
  createDevice,
  assignDeviceToUser,
};
