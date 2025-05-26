const deviceService = require('../services/device');

async function register(req, res) {
  try {
    const { device_name, serial_number } = req.body;
    const device = await deviceService.registerDevice(device_name, serial_number);
    res.status(200).json(device);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

async function list(req, res) {
  const devices = await deviceService.listDevices();
  res.json(devices);
}

async function take(req, res) {
  try {
    const { user_name, serial_number } = req.body;
    const updated = await deviceService.takeDevice(user_name, serial_number);
    res.status(200).json(updated);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

async function info(req, res) {
  try {
    const serial = req.params.serial_number;
    const device = await deviceService.getDevice(serial);
    res.status(200).json(device);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = {
  register,
  list,
  take,
  info,
};
