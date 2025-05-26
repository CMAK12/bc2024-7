const deviceStorage = require('../storage/device');
const userStorage = require('../storage/user');

async function registerDevice(name, serial) {
  const existing = await deviceStorage.findBySerial(serial);
  if (existing) {
    throw { status: 400, message: 'Device already exists' };
  }
  return await deviceStorage.createDevice(name, serial);
}

async function listDevices() {
  return await deviceStorage.findAll();
}

async function takeDevice(userName, serial) {
  const device = await deviceStorage.findBySerial(serial);
  if (!device) throw { status: 404, message: 'Device not found' };
  if (device.user_id) throw { status: 400, message: 'Device already taken' };

  const user = await userStorage.findUserByName(userName) || await userStorage.createUser(userName);
  await deviceStorage.assignDeviceToUser(serial, user.id);
}

async function getDevice(serial) {
  const device = await deviceStorage.findBySerial(serial);
  if (!device) throw { status: 404, message: 'Device not found' };

  const user = device.user_id ? await userStorage.findUserById(device.user_id) : null;
  return {
    device_name: device.name,
    user_name: user ? user.name : null,
  };
}

module.exports = {
  registerDevice,
  listDevices,
  takeDevice,
  getDevice,
};
